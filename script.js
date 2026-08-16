"use strict";

/* =========================================
   GamerXD_GZ Website Effects
   Simple, clean, and customizable
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

function applyTheme(themeName) {
    const theme = GRADIENT_THEMES[themeName] || GRADIENT_THEMES["purple-blue"];
    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem(THEME_KEY, themeName);
}

window.applyTheme = applyTheme;

const PARTICLE_LIMIT = 90;

function setupParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        particles.length = 0;
        const targetCount = Math.min(PARTICLE_LIMIT, Math.max(42, Math.round((width * height) / 24)));
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

            if (particle.x < -10) particle.x = width + 10;
            if (particle.x > width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = height + 10;
            if (particle.y > height + 10) particle.y = -10;

            ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    resizeCanvas();

    function animate() {
        drawParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    animate();
}

/* =========================================
   Bootstrap
========================================= */

document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
});

function getAIPageTarget() {
    const path = window.location.pathname || '';
    const nested = path.includes('/pages/');
    return nested ? '../ai.html' : './ai.html';
}

function ensureGlobalAIButton() {
    const pageName = (window.location.pathname || '').split('/').pop();
    const isSettingsPage = pageName === 'settings.html';

    const existingButton = document.getElementById('global-ai-button');
    if (isSettingsPage) {
        if (existingButton) existingButton.remove();
        return;
    }

    const root = document.body || document.documentElement;
    if (!root) return;

    let aiButton = existingButton;
    if (!aiButton) {
        aiButton = document.createElement('button');
        aiButton.id = 'global-ai-button';
        aiButton.className = 'ai-button';
        aiButton.type = 'button';
        aiButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><text x="12" y="16" text-anchor="middle" font-size="8" fill="currentColor">AI</text></svg>';
        aiButton.title = 'AI Assistant (Alt+A)';
        aiButton.setAttribute('aria-label', 'Open AI Assistant');

        const handleAIClick = () => {
            const currentPage = window.location.pathname;
            if (currentPage.endsWith('/ai.html') || currentPage.endsWith('ai.html')) {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    chatInput.focus();
                    return;
                }
            }

            const target = new URL(getAIPageTarget(), window.location.href);
            window.location.href = target.toString();
        };

        aiButton.addEventListener('click', handleAIClick);
        root.appendChild(aiButton);
    }

    aiButton.style.display = 'flex';
    aiButton.style.opacity = '1';
    aiButton.style.visibility = 'visible';
    aiButton.style.position = 'fixed';
    aiButton.style.bottom = '24px';
    aiButton.style.right = '24px';
    aiButton.style.zIndex = '2147483647';

    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            const currentPage = window.location.pathname;
            if (currentPage.endsWith('/ai.html') || currentPage.endsWith('ai.html')) {
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    chatInput.focus();
                    return;
                }
            }
            const target = new URL(getAIPageTarget(), window.location.href);
            window.location.href = target.toString();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || "purple-blue";
    applyTheme(savedTheme);
    ensureGlobalAIButton();
    setupParticles();
    setupScrollAnimations();
    setupCardHover();
});

window.addEventListener('pageshow', ensureGlobalAIButton);
window.addEventListener('load', ensureGlobalAIButton);
if (document.readyState !== 'loading') {
    ensureGlobalAIButton();
}

/* =========================================
   Global AI Assistant Button
========================================= */



/* =========================================
   Scroll Animations
========================================= */

function setupScrollAnimations() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

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
   Cursor Glow
========================================= */

function setupCursorGlow() {

    const glow =
        document.createElement("div");

    glow.className =
        "cursor-glow";

    document.body.appendChild(glow);


    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================
   Simple Card Hover
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

                card.classList.add(
                    "card-hover"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "card-hover"
                );

            }
        );

    });

}


/* =========================================
   COPY PROTECTION
========================================= */


/*
    This does NOT make a website impossible
    to copy.

    It only blocks common casual copying.
*/


document.addEventListener(
    "contextmenu",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "selectstart",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "dragstart",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "copy",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "cut",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "paste",
    event => {

        /*
            Allow typing into normal form fields
            if you add them later.
        */

        const tag =
            event.target.tagName;

        if (
            tag !== "INPUT" &&
            tag !== "TEXTAREA"
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================
   KEYBOARD PROTECTION
========================================= */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        /* CTRL / CMD + C */

        if (
            (event.ctrlKey || event.metaKey) &&
            key === "c"
        ) {

            event.preventDefault();

        }


        /* CTRL / CMD + X */

        if (
            (event.ctrlKey || event.metaKey) &&
            key === "x"
        ) {

            event.preventDefault();

        }


        /* CTRL / CMD + U */

        if (
            (event.ctrlKey || event.metaKey) &&
            key === "u"
        ) {

            event.preventDefault();

        }


        /* CTRL / CMD + S */

        if (
            (event.ctrlKey || event.metaKey) &&
            key === "s"
        ) {

            event.preventDefault();

        }


        /*
            Developer tools shortcuts.

            These are only a deterrent.
        */

        if (
            event.key === "F12"
        ) {

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
   IMAGE PROTECTION
========================================= */

document.querySelectorAll(
    "img"
).forEach(
    image => {

        image.setAttribute(
            "draggable",
            "false"
        );

        image.addEventListener(
            "dragstart",
            event =>
                event.preventDefault()
        );

    }
);
// --- GamerXD_GZ AI Chatbot Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatSubmit = document.getElementById('chat-submit');

    if (!chatForm) return; // Safely skips this code on pages without the chat form

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // Render User Message
        appendMessage('user', messageText);
        chatInput.value = '';
        chatSubmit.disabled = true;

        // Render Loading Indicator
        const loadingDiv = appendMessage('bot', 'Thinking...');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            
            if (data.error) {
                loadingDiv.textContent = `Error: ${data.error}`;
            } else if (data.response) {
                loadingDiv.textContent = data.response;
            } else {
                loadingDiv.textContent = "Sorry, I couldn't process that response.";
            }
        } catch (error) {
            console.error("Chat error:", error);
            loadingDiv.textContent = "Error: Unable to connect to GamerXD AI backend. Make sure the Cloudflare Worker is deployed.";
        } finally {
            chatSubmit.disabled = false;
        }
    });

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv;
    }
});