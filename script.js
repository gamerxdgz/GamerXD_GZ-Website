"use strict";

/* =========================================
   GamerXD_GZ Website
   Main Website JavaScript
========================================= */

window.setWeatherPreset = function setWeatherPreset() {};
window.fetchWeatherWithLocation = function fetchWeatherWithLocation() {};

const THEME_KEY = "gamerxdgz_theme";

const GRADIENT_THEMES = {
    "purple-blue": {
        "--bg-top": "#1d1237",
        "--bg-mid": "#2d1d52",
        "--bg-low": "#3a4f9a",
        "--bg-deep": "#1b2546",
        "--card-bg-1": "rgba(255,255,255,0.18)",
        "--card-bg-2": "rgba(126,132,255,0.12)",
        "--card-border": "rgba(255,255,255,0.28)",
        "--card-shadow": "0 18px 45px rgba(96, 77, 204, 0.22)",
        "--card-text": "rgba(255,255,255,0.96)",
        "--card-muted": "rgba(235,240,255,0.72)"
    },

    "blue-purple": {
        "--bg-top": "#102a52",
        "--bg-mid": "#3a57c8",
        "--bg-low": "#5c3bbd",
        "--bg-deep": "#190f33",
        "--card-bg-1": "rgba(255,255,255,0.16)",
        "--card-bg-2": "rgba(98,138,255,0.12)",
        "--card-border": "rgba(198,219,255,0.28)",
        "--card-shadow": "0 18px 45px rgba(59, 97, 255, 0.2)",
        "--card-text": "rgba(255,255,255,0.96)",
        "--card-muted": "rgba(222,231,255,0.74)"
    },

    "blue-green": {
        "--bg-top": "#0d2944",
        "--bg-mid": "#1f5f9b",
        "--bg-low": "#15a38d",
        "--bg-deep": "#0b2e2f",
        "--card-bg-1": "rgba(255,255,255,0.15)",
        "--card-bg-2": "rgba(90,220,210,0.1)",
        "--card-border": "rgba(200,255,247,0.24)",
        "--card-shadow": "0 18px 45px rgba(30, 143, 165, 0.22)",
        "--card-text": "rgba(245,255,255,0.97)",
        "--card-muted": "rgba(220,245,242,0.72)"
    },

    "green-blue": {
        "--bg-top": "#092b2d",
        "--bg-mid": "#1b9a8c",
        "--bg-low": "#2d6fe1",
        "--bg-deep": "#0d1d45",
        "--card-bg-1": "rgba(255,255,255,0.14)",
        "--card-bg-2": "rgba(86,222,181,0.12)",
        "--card-border": "rgba(214,255,240,0.24)",
        "--card-shadow": "0 18px 45px rgba(43, 168, 154, 0.2)",
        "--card-text": "rgba(245,255,250,0.97)",
        "--card-muted": "rgba(220,244,236,0.72)"
    },

    "red-blue": {
        "--bg-top": "#341827",
        "--bg-mid": "#7c2e5f",
        "--bg-low": "#2b76d3",
        "--bg-deep": "#111d38",
        "--card-bg-1": "rgba(255,255,255,0.14)",
        "--card-bg-2": "rgba(255,123,155,0.12)",
        "--card-border": "rgba(255,221,230,0.24)",
        "--card-shadow": "0 18px 45px rgba(199, 72, 120, 0.2)",
        "--card-text": "rgba(255,250,252,0.97)",
        "--card-muted": "rgba(255,230,237,0.72)"
    },

    "blue-red": {
        "--bg-top": "#101f46",
        "--bg-mid": "#2e67d4",
        "--bg-low": "#b63d59",
        "--bg-deep": "#2b1322",
        "--card-bg-1": "rgba(255,255,255,0.14)",
        "--card-bg-2": "rgba(113,163,255,0.12)",
        "--card-border": "rgba(255,210,218,0.24)",
        "--card-shadow": "0 18px 45px rgba(55, 104, 255, 0.2)",
        "--card-text": "rgba(255,248,249,0.97)",
        "--card-muted": "rgba(227,235,255,0.74)"
    },

    "purple-red": {
        "--bg-top": "#2a1239",
        "--bg-mid": "#6b349f",
        "--bg-low": "#d94b66",
        "--bg-deep": "#2d1320",
        "--card-bg-1": "rgba(255,255,255,0.15)",
        "--card-bg-2": "rgba(230,115,170,0.12)",
        "--card-border": "rgba(255,220,235,0.26)",
        "--card-shadow": "0 18px 45px rgba(153, 79, 224, 0.2)",
        "--card-text": "rgba(255,247,250,0.97)",
        "--card-muted": "rgba(255,228,238,0.74)"
    },

    "red-purple": {
        "--bg-top": "#3d1225",
        "--bg-mid": "#c24560",
        "--bg-low": "#6f4bc2",
        "--bg-deep": "#1b1630",
        "--card-bg-1": "rgba(255,255,255,0.14)",
        "--card-bg-2": "rgba(197,111,220,0.12)",
        "--card-border": "rgba(255,220,240,0.26)",
        "--card-shadow": "0 18px 45px rgba(204, 86, 126, 0.2)",
        "--card-text": "rgba(255,247,250,0.97)",
        "--card-muted": "rgba(255,233,243,0.72)"
    },

    "violet-cyan": {
        "--bg-top": "#26153f",
        "--bg-mid": "#4a4ae7",
        "--bg-low": "#47d4d1",
        "--bg-deep": "#0d1d2e",
        "--card-bg-1": "rgba(255,255,255,0.16)",
        "--card-bg-2": "rgba(99,203,255,0.12)",
        "--card-border": "rgba(220,255,255,0.24)",
        "--card-shadow": "0 18px 45px rgba(72, 94, 255, 0.2)",
        "--card-text": "rgba(244,251,255,0.97)",
        "--card-muted": "rgba(220,239,255,0.74)"
    },

    "cyan-violet": {
        "--bg-top": "#0d1d2e",
        "--bg-mid": "#2aa9cc",
        "--bg-low": "#5e4bf2",
        "--bg-deep": "#1f1038",
        "--card-bg-1": "rgba(255,255,255,0.15)",
        "--card-bg-2": "rgba(113,97,255,0.12)",
        "--card-border": "rgba(214,224,255,0.24)",
        "--card-shadow": "0 18px 45px rgba(42, 169, 204, 0.2)",
        "--card-text": "rgba(245,249,255,0.97)",
        "--card-muted": "rgba(220,228,255,0.74)"
    },

    "black": {
        "--bg-top": "#030507",
        "--bg-mid": "#0b0f16",
        "--bg-low": "#121a24",
        "--bg-deep": "#05070b",
        "--card-bg-1": "rgba(255,255,255,0.08)",
        "--card-bg-2": "rgba(136,150,166,0.08)",
        "--card-border": "rgba(255,255,255,0.12)",
        "--card-shadow": "0 18px 45px rgba(0, 0, 0, 0.46)",
        "--card-text": "rgba(255,255,255,0.98)",
        "--card-muted": "rgba(210,216,226,0.74)"
    }
};

/* =========================================
   Theme System
========================================= */

function applyTheme(themeName) {
    const theme =
        GRADIENT_THEMES[themeName] ||
        GRADIENT_THEMES["purple-blue"];

    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });

    try {
        localStorage.setItem(THEME_KEY, themeName);
    } catch (error) {
        console.warn("Unable to save theme preference.");
    }
}

window.applyTheme = applyTheme;

/* =========================================
   Particles
========================================= */

const PARTICLE_LIMIT = 90;

function setupParticles() {
    const canvas = document.getElementById("particles");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const particles = [];

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;

        const pixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

        particles.length = 0;

        const targetCount = Math.min(
            PARTICLE_LIMIT,
            Math.max(
                42,
                Math.round((width * height) / 24000)
            )
        );

        for (let i = 0; i < targetCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.8 + 0.8,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7 + 0.12,
                alpha: Math.random() * 0.55 + 0.15
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < -10) {
                particle.x = width + 10;
            }

            if (particle.x > width + 10) {
                particle.x = -10;
            }

            if (particle.y < -10) {
                particle.y = height + 10;
            }

            if (particle.y > height + 10) {
                particle.y = -10;
            }

            ctx.fillStyle =
                `rgba(255,255,255,${particle.alpha})`;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();
        });
    }

    resizeCanvas();

    let animationFrame;

    function animate() {
        drawParticles();
        animationFrame =
            requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener(
        "resize",
        resizeCanvas,
        { passive: true }
    );

    window.addEventListener(
        "pagehide",
        () => {
            cancelAnimationFrame(animationFrame);
        },
        { once: true }
    );
}

/* =========================================
   Scroll Animations
========================================= */

function setupScrollAnimations() {
    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("show");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

    elements.forEach(element => {
        observer.observe(element);
    });
}

/* =========================================
   Card Hover
========================================= */

function setupCardHover() {
    const cards =
        document.querySelectorAll(
            ".feature-card, .project-card, .coming-card"
        );

    cards.forEach(card => {
        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add("card-hover");
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove("card-hover");
            }
        );
    });
}

/* =========================================
   Copy Protection
========================================= */

document.addEventListener(
    "contextmenu",
    event => {
        event.preventDefault();
    }
);

document.addEventListener(
    "selectstart",
    event => {
        const target = event.target;

        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement
        ) {
            return;
        }

        event.preventDefault();
    }
);

document.addEventListener(
    "dragstart",
    event => {
        if (
            event.target instanceof HTMLImageElement
        ) {
            event.preventDefault();
        }
    }
);

document.addEventListener(
    "copy",
    event => {
        const target = event.target;

        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement
        ) {
            return;
        }

        event.preventDefault();
    }
);

document.addEventListener(
    "cut",
    event => {
        const target = event.target;

        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement
        ) {
            return;
        }

        event.preventDefault();
    }
);

document.addEventListener(
    "paste",
    event => {
        const target = event.target;

        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement
        ) {
            return;
        }

        event.preventDefault();
    }
);

/* =========================================
   Keyboard Protection
========================================= */

document.addEventListener(
    "keydown",
    event => {
        const key =
            event.key.toLowerCase();

        const modifier =
            event.ctrlKey ||
            event.metaKey;

        if (
            modifier &&
            ["c", "x", "u", "s"].includes(key)
        ) {
            event.preventDefault();
        }

        if (event.key === "F12") {
            event.preventDefault();
        }

        if (
            event.ctrlKey &&
            event.shiftKey &&
            ["i", "j", "c"].includes(key)
        ) {
            event.preventDefault();
        }
    }
);

/* =========================================
   Image Protection
========================================= */

function setupImageProtection() {
    document.querySelectorAll("img").forEach(image => {
        image.setAttribute("draggable", "false");

        image.addEventListener(
            "dragstart",
            event => {
                event.preventDefault();
            }
        );
    });
}

/* =========================================
   GamerXD_GZ AI Assistant
========================================= */

function setupAIChat() {
    const chatForm =
        document.getElementById("chat-form");

    const chatInput =
        document.getElementById("chat-input");

    const chatMessages =
        document.getElementById("chat-messages");

    const chatSubmit =
        document.getElementById("chat-submit");

    if (
        !chatForm ||
        !chatInput ||
        !chatMessages
    ) {
        return;
    }

    let isSending = false;

    chatForm.addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            if (isSending) return;

            const messageText =
                chatInput.value.trim();

            if (!messageText) return;

            isSending = true;

            appendMessage(
                "user",
                messageText
            );

            chatInput.value = "";

            if (chatSubmit) {
                chatSubmit.disabled = true;
            }

            const loadingMessage =
                appendMessage(
                    "bot",
                    "Thinking..."
                );

            try {
                const response =
                    await fetch(
                        "/api/chat",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                                "Accept":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                message:
                                    messageText
                            })
                        }
                    );

                const contentType =
                    response.headers.get(
                        "content-type"
                    ) || "";

                let data = null;

                if (
                    contentType.includes(
                        "application/json"
                    )
                ) {
                    data =
                        await response.json();
                } else {
                    const text =
                        await response.text();

                    data = {
                        response: text
                    };
                }

                if (!response.ok) {
                    throw new Error(
                        data?.error ||
                        `Request failed with status ${response.status}`
                    );
                }

                if (data?.error) {
                    loadingMessage.textContent =
                        `Error: ${data.error}`;

                    return;
                }

                const botResponse =
                    data?.response ||
                    data?.message ||
                    data?.reply;

                if (botResponse) {
                    loadingMessage.textContent =
                        String(botResponse);
                } else {
                    loadingMessage.textContent =
                        "Sorry, I couldn't process that response.";
                }

            } catch (error) {
                console.error(
                    "GamerXD_GZ AI error:",
                    error
                );

                loadingMessage.textContent =
                    "Unable to connect to GamerXD_GZ AI right now. Please try again later.";

            } finally {
                isSending = false;

                if (chatSubmit) {
                    chatSubmit.disabled = false;
                }

                chatInput.focus();
            }
        }
    );

    function appendMessage(sender, text) {
        const message =
            document.createElement("div");

        message.className =
            `msg ${sender}`;

        message.textContent =
            String(text);

        chatMessages.appendChild(message);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        return message;
    }
}

/* =========================================
   Main Bootstrap
========================================= */

function initializeWebsite() {
    let savedTheme = "purple-blue";

    try {
        savedTheme =
            localStorage.getItem(THEME_KEY) ||
            "purple-blue";
    } catch (error) {
        console.warn(
            "Unable to read saved theme."
        );
    }

    applyTheme(savedTheme);

    setupParticles();
    setupScrollAnimations();
    setupCardHover();
    setupImageProtection();
    setupAIChat();
}

if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite,
        { once: true }
    );
} else {
    initializeWebsite();
}