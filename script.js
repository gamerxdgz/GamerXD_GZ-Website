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

    const particleCount =
        Math.min(80, Math.floor(width / 15));

    for (let i = 0; i < particleCount; i++) {

        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,

            size:
                Math.random() * 1.8 + 0.5,

            speedX:
                (Math.random() - 0.5) * 0.3,

            speedY:
                (Math.random() - 0.5) * 0.3,

            opacity:
                Math.random() * 0.45 + 0.1
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


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(255,255,255,${particle.opacity})`;

            ctx.fill();

        });


        requestAnimationFrame(animate);

    }

    animate();
}


/* =========================================
   Click Ripple
========================================= */

function setupClickEffect() {

    document.addEventListener("click", event => {

        const ripple =
            document.createElement("div");

        ripple.className = "click-ripple";

        ripple.style.left =
            `${event.clientX}px`;

        ripple.style.top =
            `${event.clientY}px`;

        document.body.appendChild(ripple);


        setTimeout(() => {
            ripple.remove();
        }, 600);

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
"use strict";


/* =========================================
   PARTICLES
========================================= */

const canvas =
    document.getElementById("particles");

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let width =
        window.innerWidth;

    let height =
        window.innerHeight;

    canvas.width = width;
    canvas.height = height;


    const particles = [];

    const count =
        Math.min(
            90,
            Math.floor(width / 12)
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push({

            x:
                Math.random() * width,

            y:
                Math.random() * height,

            size:
                Math.random() * 1.8 + .4,

            speedX:
                (Math.random() - .5) * .3,

            speedY:
                (Math.random() - .5) * .3,

            opacity:
                Math.random() * .4 + .1

        });

    }


    window.addEventListener(
        "resize",
        () => {

            width =
                window.innerWidth;

            height =
                window.innerHeight;

            canvas.width =
                width;

            canvas.height =
                height;

        }
    );


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        for (const particle of particles) {

            particle.x +=
                particle.speedX;

            particle.y +=
                particle.speedY;


            if (particle.x < 0)
                particle.x = width;

            if (particle.x > width)
                particle.x = 0;

            if (particle.y < 0)
                particle.y = height;

            if (particle.y > height)
                particle.y = 0;


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${particle.opacity}
                )`;

            ctx.fill();

        }


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

}


/* =========================================
   CLICK RIPPLE
========================================= */

document.addEventListener(
    "click",
    event => {

        const ripple =
            document.createElement("div");

        ripple.className =
            "click-ripple";

        ripple.style.left =
            `${event.clientX}px`;

        ripple.style.top =
            `${event.clientY}px`;

        document.body.appendChild(
            ripple
        );


        setTimeout(
            () => ripple.remove(),
            600
        );

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (revealElements.length) {

    const observer =
        new IntersectionObserver(
            entries => {

                for (const entry of entries) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(
        element =>
            observer.observe(element)
    );

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