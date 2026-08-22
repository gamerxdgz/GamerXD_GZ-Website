export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        const origin = request.headers.get("Origin");

        const allowedOrigins = [
            "https://gamerxd-gz-website.pages.dev",
            "https://gamerxd-gz-website.gamerxdgz.workers.dev",
            "https://gamerxdgz.workers.dev"
        ];

        const corsOrigin =
            allowedOrigins.includes(origin)
                ? origin
                : allowedOrigins[0];

        const corsHeaders = {
            "Access-Control-Allow-Origin": corsOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Vary": "Origin"
        };

        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: corsHeaders
            });
        }

        if (
            url.pathname === "/api/chat" &&
            request.method === "POST"
        ) {
            try {
                const body = await request.json();

                const message = body?.message;

                if (
                    !message ||
                    typeof message !== "string"
                ) {
                    return new Response(
                        JSON.stringify({
                            error: "No message provided"
                        }),
                        {
                            status: 400,
                            headers: {
                                ...corsHeaders,
                                "Content-Type":
                                    "application/json"
                            }
                        }
                    );
                }

                const aiResponse = await env.AI.run(
                    "@cf/meta/llama-3.1-8b-instruct-fast",
                    {
                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are the GamerXD_GZ AI Assistant. Help visitors with GamerXD_GZ, Minecraft, Eaglercraft, coding, website projects, and the community. Keep responses helpful, clear, concise, and friendly."
                            },
                            {
                                role: "user",
                                content: message
                            }
                        ]
                    }
                );

                const responseText =
                    aiResponse?.result?.response ||
                    aiResponse?.response ||
                    "I couldn't generate a response.";

                return new Response(
                    JSON.stringify({
                        response: responseText
                    }),
                    {
                        status: 200,
                        headers: {
                            ...corsHeaders,
                            "Content-Type":
                                "application/json"
                        }
                    }
                );

            } catch (error) {
                console.error("AI Error:", error);

                return new Response(
                    JSON.stringify({
                        error:
                            "The GamerXD_GZ AI encountered an error."
                    }),
                    {
                        status: 500,
                        headers: {
                            ...corsHeaders,
                            "Content-Type":
                                "application/json"
                        }
                    }
                );
            }
        }

        return env.ASSETS.fetch(request);
    }
};