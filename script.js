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