"use strict";

/* =========================================
   GamerXD_GZ Website Effects
   Simple, clean, and customizable
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupParticles();
    setupClickEffect();
    setupScrollAnimations();
    setupCursorGlow();
    setupCardHover();
});


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
        "rgba(150, 190, 120, 0.65)",
        "rgba(120, 170, 100, 0.58)",
        "rgba(100, 140, 78, 0.5)",
        "rgba(180, 150, 105, 0.45)",
        "rgba(130, 130, 130, 0.42)"
    ];

    const particleCount =
        Math.min(48, Math.floor(width / 22));

    for (let i = 0; i < particleCount; i++) {

        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,

            size:
                Math.random() * 1.8 + 1,

            speedX:
                (Math.random() - 0.5) * 0.18,

            speedY:
                (Math.random() - 0.5) * 0.18,

            opacity:
                Math.random() * 0.26 + 0.08,

            color:
                palette[Math.floor(Math.random() * palette.length)]
        });

    }


    window.addEventListener("resize", () => {

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

    });


    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(particle => {

            particle.x += particle.speedX;
            particle.y += particle.speedY;


            if (particle.x < 0)
                particle.x = width;

            if (particle.x > width)
                particle.x = 0;

            if (particle.y < 0)
                particle.y = height;

            if (particle.y > height)
                particle.y = 0;

            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.fillRect(
                particle.x,
                particle.y,
                particle.size,
                particle.size
            );

        });

        ctx.globalAlpha = 1;


        requestAnimationFrame(animate);

    }

    animate();
}


/* =========================================
   Click Particle Burst
========================================= */

function setupClickEffect() {

    document.addEventListener("pointerdown", event => {

        const burst =
            document.createElement("div");

        burst.className = "click-burst";

        burst.style.left =
            `${event.clientX}px`;

        burst.style.top =
            `${event.clientY}px`;

        const particleCount = 10;
        const particleColors = [
            "rgba(150, 220, 110, 0.9)",
            "rgba(120, 190, 90, 0.8)",
            "rgba(195, 166, 118, 0.7)",
            "rgba(130, 128, 128, 0.7)"
        ];

        for (let i = 0; i < particleCount; i++) {

            const particle =
                document.createElement("span");

            const angle =
                (Math.PI * 2 * i) / particleCount +
                (Math.random() - 0.5) * 0.7;

            const distance =
                10 + Math.random() * 22;

            const offsetX =
                Math.cos(angle) * distance;

            const offsetY =
                Math.sin(angle) * distance;

            const size =
                2 + Math.random() * 4;

            particle.className = "click-particle";
            particle.style.setProperty("--dx", `${offsetX}px`);
            particle.style.setProperty("--dy", `${offsetY}px`);
            particle.style.setProperty("--size", `${size}px`);
            particle.style.setProperty(
                "--particle-color",
                particleColors[Math.floor(Math.random() * particleColors.length)]
            );

            burst.appendChild(particle);

        }

        document.body.appendChild(burst);

        setTimeout(() => {
            burst.remove();
        }, 700);

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