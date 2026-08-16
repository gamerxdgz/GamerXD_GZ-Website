const SESSION_DAYS = 7;

export default {
    async fetch(request, env) {

        const url = new URL(request.url);

        /*
         * Authentication API
         */

        if (
            request.method === "POST" &&
            url.pathname === "/api/register"
        ) {
            return register(request, env);
        }

        if (
            request.method === "POST" &&
            url.pathname === "/api/login"
        ) {
            return login(request, env);
        }

        if (
            request.method === "POST" &&
            url.pathname === "/api/logout"
        ) {
            return logout(request, env);
        }

        if (
            request.method === "GET" &&
            url.pathname === "/api/me"
        ) {
            return currentUser(request, env);
        }


        /*
         * Everything else is handled by
         * Cloudflare Static Assets.
         */

        return env.ASSETS.fetch(request);
    }
};


/* =========================
   Register
========================= */

async function register(request, env) {

    try {

        const body =
            await request.json();

        const username =
            String(body.username || "")
                .trim();

        const password =
            String(body.password || "");


        if (
            !/^[A-Za-z0-9_]{3,24}$/
                .test(username)
        ) {

            return json({
                error:
                    "Username must be 3-24 characters and use only letters, numbers, or underscores."
            }, 400);
        }


        if (
            password.length < 8 ||
            password.length > 128
        ) {

            return json({
                error:
                    "Password must be between 8 and 128 characters."
            }, 400);
        }


        const existing =
            await env.DB
                .prepare(
                    "SELECT id FROM users WHERE username = ?"
                )
                .bind(username)
                .first();


        if (existing) {

            return json({
                error:
                    "That username is already taken."
            }, 409);
        }


        const passwordHash =
            await hashPassword(password);


        await env.DB
            .prepare(
                `INSERT INTO users
                (username, password_hash, created_at)
                VALUES (?, ?, ?)`
            )
            .bind(
                username,
                passwordHash,
                Date.now()
            )
            .run();


        return json({
            success: true,
            message:
                "Account created successfully."
        }, 201);


    } catch (error) {

        console.error(error);

        return json({
            error:
                "Unable to create account."
        }, 500);
    }
}


/* =========================
   Login
========================= */

async function login(request, env) {

    try {

        const body =
            await request.json();

        const username =
            String(body.username || "")
                .trim();

        const password =
            String(body.password || "");


        const user =
            await env.DB
                .prepare(
                    `SELECT id, username, password_hash
                     FROM users
                     WHERE username = ?`
                )
                .bind(username)
                .first();


        if (!user) {

            return json({
                error:
                    "Invalid username or password."
            }, 401);
        }


        const valid =
            await verifyPassword(
                password,
                user.password_hash
            );


        if (!valid) {

            return json({
                error:
                    "Invalid username or password."
            }, 401);
        }


        const sessionToken =
            randomToken();


        const expiresAt =
            Date.now() +
            SESSION_DAYS *
            24 *
            60 *
            60 *
            1000;


        await env.DB
            .prepare(
                `INSERT INTO sessions
                (token, user_id, expires_at)
                VALUES (?, ?, ?)`
            )
            .bind(
                sessionToken,
                user.id,
                expiresAt
            )
            .run();


        return new Response(
            JSON.stringify({
                success: true,
                username: user.username
            }),
            {
                status: 200,

                headers: {

                    "content-type":
                        "application/json; charset=UTF-8",

                    "Set-Cookie":
                        `session=${sessionToken}; ` +
                        `HttpOnly; Secure; ` +
                        `SameSite=Lax; ` +
                        `Path=/; ` +
                        `Max-Age=${SESSION_DAYS * 86400}`
                }
            }
        );


    } catch (error) {

        console.error(error);

        return json({
            error:
                "Unable to log in."
        }, 500);
    }
}


/* =========================
   Logout
========================= */

async function logout(request, env) {

    const token =
        getCookie(
            request,
            "session"
        );


    if (token) {

        await env.DB
            .prepare(
                "DELETE FROM sessions WHERE token = ?"
            )
            .bind(token)
            .run();
    }


    return new Response(
        JSON.stringify({
            success: true
        }),
        {
            status: 200,

            headers: {

                "content-type":
                    "application/json; charset=UTF-8",

                "Set-Cookie":
                    "session=; HttpOnly; Secure; " +
                    "SameSite=Lax; Path=/; Max-Age=0"
            }
        }
    );
}


/* =========================
   Current User
========================= */

async function currentUser(
    request,
    env
) {

    const token =
        getCookie(
            request,
            "session"
        );


    if (!token) {

        return json({
            loggedIn: false
        });
    }


    const session =
        await env.DB
            .prepare(
                `SELECT
                    users.id,
                    users.username,
                    sessions.expires_at
                 FROM sessions
                 JOIN users
                 ON users.id = sessions.user_id
                 WHERE sessions.token = ?`
            )
            .bind(token)
            .first();


    if (!session) {

        return json({
            loggedIn: false
        });
    }


    if (
        session.expires_at <
        Date.now()
    ) {

        await env.DB
            .prepare(
                "DELETE FROM sessions WHERE token = ?"
            )
            .bind(token)
            .run();


        return json({
            loggedIn: false
        });
    }


    return json({
        loggedIn: true,
        username: session.username
    });
}


/* =========================
   Password Hashing
========================= */

async function hashPassword(
    password
) {

    const salt =
        crypto.getRandomValues(
            new Uint8Array(16)
        );


    const encoder =
        new TextEncoder();


    const passwordData =
        encoder.encode(password);


    let data =
        new Uint8Array(
            salt.length +
            passwordData.length
        );


    data.set(salt, 0);

    data.set(
        passwordData,
        salt.length
    );


    let hash =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );


    for (
        let i = 0;
        i < 99;
        i++
    ) {

        hash =
            await crypto.subtle.digest(
                "SHA-256",
                hash
            );
    }


    return (
        "100|" +
        bytesToBase64(salt) +
        "|" +
        bytesToBase64(hash)
    );
}


async function verifyPassword(
    password,
    stored
) {

    const parts =
        stored.split("|");


    if (
        parts.length !== 3 ||
        parts[0] !== "100"
    ) {

        return false;
    }


    const salt =
        base64ToBytes(parts[1]);

    const expected =
        base64ToBytes(parts[2]);


    const encoder =
        new TextEncoder();


    const passwordData =
        encoder.encode(password);


    let data =
        new Uint8Array(
            salt.length +
            passwordData.length
        );


    data.set(salt, 0);

    data.set(
        passwordData,
        salt.length
    );


    let hash =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );


    for (
        let i = 0;
        i < 99;
        i++
    ) {

        hash =
            await crypto.subtle.digest(
                "SHA-256",
                hash
            );
    }


    return constantTimeEqual(
        new Uint8Array(hash),
        expected
    );
}


/* =========================
   Utilities
========================= */

function constantTimeEqual(
    a,
    b
) {

    if (
        a.length !==
        b.length
    ) {

        return false;
    }


    let result = 0;


    for (
        let i = 0;
        i < a.length;
        i++
    ) {

        result |=
            a[i] ^ b[i];
    }


    return result === 0;
}


function randomToken() {

    const bytes =
        crypto.getRandomValues(
            new Uint8Array(32)
        );


    return bytesToBase64(bytes)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}


function bytesToBase64(
    bytes
) {

    let binary = "";


    for (const byte of bytes) {

        binary +=
            String.fromCharCode(byte);
    }


    return btoa(binary);
}


function base64ToBytes(
    value
) {

    const binary =
        atob(value);


    const bytes =
        new Uint8Array(
            binary.length
        );


    for (
        let i = 0;
        i < binary.length;
        i++
    ) {

        bytes[i] =
            binary.charCodeAt(i);
    }


    return bytes;
}


function getCookie(
    request,
    name
) {

    const cookieHeader =
        request.headers.get(
            "Cookie"
        ) || "";


    const cookies =
        cookieHeader.split(";");


    for (
        const cookie of cookies
    ) {

        const [
            key,
            ...value
        ] =
            cookie.trim().split("=");


        if (key === name) {

            return value.join("=");
        }
    }


    return null;
}


function json(
    data,
    status = 200
) {

    return new Response(
        JSON.stringify(data),
        {
            status,

            headers: {
                "content-type":
                    "application/json; charset=UTF-8"
            }
        }
    );
}