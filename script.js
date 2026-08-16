"use strict";

/* =========================================
   GamerXD_GZ Website Effects
   Simple, clean, and customizable
========================================= */

window.setWeatherPreset = function setWeatherPreset() {};
window.fetchWeatherWithLocation = function fetchWeatherWithLocation() {};

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
                radius: Math.random() * 2.2 + 0.8,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7 + 0.15,
                alpha: Math.random() * 0.65 + 0.2
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

            const glow = ctx.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                particle.radius * 8
            );
            glow.addColorStop(0, `rgba(255,255,255,${particle.alpha})`);
            glow.addColorStop(0.35, `rgba(169,154,255,${particle.alpha * 0.7})`);
            glow.addColorStop(1, `rgba(169,154,255,0)`);
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
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

document.addEventListener("DOMContentLoaded", () => {
    setupGlobalAIButton();
    setupParticles();
    setupScrollAnimations();
    setupCardHover();
});

/* =========================================
   Global AI Assistant Button
========================================= */

function setupGlobalAIButton() {
    const existingButton = document.getElementById('global-ai-button');
    if (existingButton) return;

    const aiButton = document.createElement('button');
    aiButton.id = 'global-ai-button';
    aiButton.className = 'ai-button';
    aiButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><text x="12" y="16" text-anchor="middle" font-size="8" fill="currentColor">AI</text></svg>';
    aiButton.title = 'AI Assistant (Alt+A)';
    aiButton.setAttribute('aria-label', 'Open AI Assistant');
    document.body.appendChild(aiButton);

    const handleAIClick = () => {
        const currentPage = window.location.pathname;
        if (currentPage.includes('ai.html')) {
            const chatInput = document.getElementById('chat-input');
            if (chatInput) chatInput.focus();
        } else {
            window.location.href = '/ai.html';
        }
    };

    aiButton.addEventListener('click', handleAIClick);

    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            handleAIClick();
        }
    });
}


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