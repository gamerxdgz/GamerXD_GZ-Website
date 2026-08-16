"use strict";

/* =========================================
   GamerXD_GZ Website Effects
   Simple, clean, and customizable
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupParticles();
    setupScrollAnimations();
    setupCardHover();
});

function drawWindowGlass(ctx, width, height) {
    ctx.fillStyle = "rgba(255,255,255,0.015)";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.025)";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
        const x = (width / 4) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let i = 0; i <= 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}


/* =========================================
   Background Particles
========================================= */

function setupParticles() {

    const canvas = document.getElementById("particles");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const palette = [
        "rgba(180, 200, 220, 0.28)",
        "rgba(160, 178, 200, 0.24)",
        "rgba(200, 215, 230, 0.2)",
        "rgba(126, 146, 170, 0.18)"
    ];

    const particleCount = Math.min(55, Math.floor(width / 24));

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 16 + 10,
            width: Math.random() * 0.9 + 0.55,
            speedX: (Math.random() - 0.5) * 0.25,
            speedY: Math.random() * 2.3 + 1.6,
            opacity: Math.random() * 0.16 + 0.05,
            color: palette[Math.floor(Math.random() * palette.length)]
        });
    }

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawWindowGlass(ctx, width, height);

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < -20) particle.x = width + 20;
            if (particle.x > width + 20) particle.x = -20;
            if (particle.y > height + 30) {
                particle.y = -30;
                particle.x = Math.random() * width;
            }

            ctx.globalAlpha = particle.opacity;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = particle.width;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x - particle.speedX * 3.8, particle.y - particle.length);
            ctx.stroke();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    animate();
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