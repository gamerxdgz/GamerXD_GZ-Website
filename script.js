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

function drawWindowGlass(ctx, width, height, scene) {
    const config = {
        sunrise: {
            top: "rgba(255, 196, 132, 0.22)",
            mid: "rgba(122, 142, 169, 0.1)",
            bottom: "rgba(24, 31, 39, 0.18)"
        },
        day: {
            top: "rgba(255,255,255,0.14)",
            mid: "rgba(180,200,220,0.08)",
            bottom: "rgba(12,16,22,0.12)"
        },
        sunset: {
            top: "rgba(255, 166, 120, 0.2)",
            mid: "rgba(162, 130, 110, 0.1)",
            bottom: "rgba(26, 30, 38, 0.18)"
        },
        dusk: {
            top: "rgba(148, 122, 190, 0.22)",
            mid: "rgba(100, 117, 160, 0.1)",
            bottom: "rgba(16, 22, 32, 0.2)"
        },
        night: {
            top: "rgba(120, 138, 170, 0.18)",
            mid: "rgba(64, 78, 98, 0.1)",
            bottom: "rgba(8, 12, 18, 0.2)"
        },
        rain: {
            top: "rgba(150, 170, 196, 0.18)",
            mid: "rgba(90, 106, 124, 0.08)",
            bottom: "rgba(12, 18, 26, 0.2)"
        },
        snowy: {
            top: "rgba(215, 222, 232, 0.18)",
            mid: "rgba(165, 178, 190, 0.08)",
            bottom: "rgba(38, 46, 56, 0.18)"
        },
        foggy: {
            top: "rgba(198, 205, 214, 0.12)",
            mid: "rgba(135, 142, 150, 0.08)",
            bottom: "rgba(24, 28, 34, 0.15)"
        },
        thunder: {
            top: "rgba(104, 118, 134, 0.2)",
            mid: "rgba(74, 86, 102, 0.08)",
            bottom: "rgba(8, 12, 18, 0.2)"
        }
    };

    const palette = config[scene] || config.day;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, palette.top);
    gradient.addColorStop(0.3, palette.mid);
    gradient.addColorStop(0.72, "rgba(255,255,255,0.03)");
    gradient.addColorStop(1, palette.bottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.03)";
    for (let i = 0; i <= 6; i++) {
        const x = (width / 6) * i;
        ctx.fillRect(x, 0, 1, height);
    }
    for (let i = 0; i <= 8; i++) {
        const y = (height / 8) * i;
        ctx.fillRect(0, y, width, 1);
    }

    const gloss = ctx.createRadialGradient(
        width * 0.28,
        height * 0.2,
        20,
        width * 0.28,
        height * 0.2,
        width * 0.8
    );
    gloss.addColorStop(0, "rgba(255,255,255,0.15)");
    gloss.addColorStop(0.3, "rgba(255,255,255,0.05)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gloss;
    ctx.fillRect(0, 0, width, height);
}


/* =========================================
   Background Particles
========================================= */

const WEATHER_MODE_KEY = "gamerxdgz_weather_mode";

function getSavedWeatherMode() {
    const validModes = [
        "auto",
        "sunrise",
        "day",
        "cloudy",
        "sunset",
        "dusk",
        "night",
        "rain",
        "snowy",
        "foggy",
        "thunder"
    ];

    const saved = localStorage.getItem(WEATHER_MODE_KEY);
    return validModes.includes(saved) ? saved : "auto";
}

window.setWeatherPreset = function setWeatherPreset(mode) {
    const validModes = [
        "auto",
        "sunrise",
        "day",
        "cloudy",
        "sunset",
        "dusk",
        "night",
        "rain",
        "snowy",
        "foggy",
        "thunder"
    ];

    if (!validModes.includes(mode)) {
        return;
    }

    if (mode === "auto") {
        localStorage.removeItem(WEATHER_MODE_KEY);
    } else {
        localStorage.setItem(WEATHER_MODE_KEY, mode);
    }

    const weatherCanvas = document.getElementById("particles");
    if (weatherCanvas && weatherCanvas.__weatherState) {
        weatherCanvas.__weatherState.applyMode(mode === "auto" ? "auto" : mode);
    }
};

function setupParticles() {

    const canvas = document.getElementById("particles");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let weatherMode = "day";
    let targetScene = "day";
    let sceneBlend = 1;
    let particles = [];
    let lightningFlash = 0;
    let lightningTimer = 0;

    canvas.width = width;
    canvas.height = height;
    canvas.__weatherState = {
        applyMode(mode) {
            if (mode === "auto") {
                fetchWeather();
                return;
            }

            targetScene = mode;
            weatherMode = mode;
            sceneBlend = 0;
            updateBackgroundTheme(mode);
            buildParticles(mode);
        }
    };

    function getSceneFromWeather(code, precipitation, isDay, hour) {
        const morning = hour >= 5 && hour < 8;
        const sunrise = hour >= 8 && hour < 9;
        const sunset = hour >= 17 && hour < 19;
        const dusk = hour >= 19 && hour < 21;
        const night = !isDay || hour >= 21 || hour < 5;

        if ([95, 96, 99].includes(code)) return "thunder";
        if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
        if ([45, 48].includes(code)) return "foggy";

        if (precipitation > 0.5 || [61, 63, 65, 80, 81, 82, 51, 55, 56].includes(code)) {
            return "rain";
        }

        if (morning) return "sunrise";
        if (sunrise) return "sunrise";
        if (sunset) return "sunset";
        if (dusk) return "dusk";
        if (night) return "night";
        return "day";
    }

    function getSceneConfig(mode) {
        const configs = {
            sunrise: {
                background: "linear-gradient(180deg, rgba(255, 174, 114, 0.82), rgba(35, 46, 60, 1))",
                count: 62,
                speedMin: 1.6,
                speedMax: 3.2,
                drift: 0.3,
                lengthMin: 15,
                lengthMax: 28,
                widthMin: 0.9,
                widthMax: 1.4,
                opacityMin: 0.08,
                opacityMax: 0.28,
                colors: [
                    "rgba(255, 208, 178, 0.42)",
                    "rgba(220, 228, 240, 0.24)",
                    "rgba(170, 188, 214, 0.2)"
                ]
            },
            day: {
                background: "linear-gradient(180deg, rgba(90, 106, 123, 0.9), rgba(17, 22, 30, 1))",
                count: 52,
                speedMin: 1.2,
                speedMax: 2.8,
                drift: 0.22,
                lengthMin: 12,
                lengthMax: 22,
                widthMin: 0.8,
                widthMax: 1.2,
                opacityMin: 0.05,
                opacityMax: 0.2,
                colors: [
                    "rgba(206, 220, 239, 0.28)",
                    "rgba(176, 192, 212, 0.22)",
                    "rgba(150, 170, 193, 0.18)"
                ]
            },
            cloudy: {
                background: "linear-gradient(180deg, rgba(106, 116, 128, 0.9), rgba(18, 22, 28, 1))",
                count: 80,
                speedMin: 1.1,
                speedMax: 2.5,
                drift: 0.18,
                lengthMin: 11,
                lengthMax: 20,
                widthMin: 0.7,
                widthMax: 1.1,
                opacityMin: 0.06,
                opacityMax: 0.18,
                colors: [
                    "rgba(210, 221, 232, 0.26)",
                    "rgba(191, 201, 214, 0.2)",
                    "rgba(162, 175, 188, 0.16)"
                ]
            },
            sunset: {
                background: "linear-gradient(180deg, rgba(255, 136, 84, 0.9), rgba(24, 32, 42, 1))",
                count: 68,
                speedMin: 1.8,
                speedMax: 3.4,
                drift: 0.3,
                lengthMin: 14,
                lengthMax: 26,
                widthMin: 0.9,
                widthMax: 1.3,
                opacityMin: 0.07,
                opacityMax: 0.25,
                colors: [
                    "rgba(255, 196, 148, 0.42)",
                    "rgba(200, 198, 214, 0.24)",
                    "rgba(153, 164, 190, 0.18)"
                ]
            },
            dusk: {
                background: "linear-gradient(180deg, rgba(122, 104, 172, 0.82), rgba(16, 20, 30, 1))",
                count: 64,
                speedMin: 1.6,
                speedMax: 3.1,
                drift: 0.26,
                lengthMin: 13,
                lengthMax: 24,
                widthMin: 0.8,
                widthMax: 1.2,
                opacityMin: 0.07,
                opacityMax: 0.24,
                colors: [
                    "rgba(218, 220, 244, 0.32)",
                    "rgba(170, 186, 214, 0.22)",
                    "rgba(136, 150, 182, 0.18)"
                ]
            },
            night: {
                background: "linear-gradient(180deg, rgba(26, 36, 48, 1), rgba(4, 8, 12, 1))",
                count: 54,
                speedMin: 1.0,
                speedMax: 2.2,
                drift: 0.15,
                lengthMin: 10,
                lengthMax: 18,
                widthMin: 0.7,
                widthMax: 1.0,
                opacityMin: 0.05,
                opacityMax: 0.18,
                colors: [
                    "rgba(188, 208, 228, 0.22)",
                    "rgba(140, 160, 182, 0.18)",
                    "rgba(112, 128, 148, 0.14)"
                ]
            },
            rain: {
                background: "linear-gradient(180deg, rgba(54, 68, 82, 0.96), rgba(8, 14, 20, 1))",
                count: 170,
                speedMin: 3.0,
                speedMax: 5.8,
                drift: 0.5,
                lengthMin: 20,
                lengthMax: 42,
                widthMin: 0.9,
                widthMax: 1.7,
                opacityMin: 0.12,
                opacityMax: 0.42,
                colors: [
                    "rgba(214, 228, 240, 0.9)",
                    "rgba(186, 203, 220, 0.78)",
                    "rgba(155, 174, 194, 0.68)"
                ]
            },
            snowy: {
                background: "linear-gradient(180deg, rgba(205, 218, 230, 0.85), rgba(96, 110, 128, 1))",
                count: 100,
                speedMin: 0.9,
                speedMax: 2.2,
                drift: 0.2,
                lengthMin: 10,
                lengthMax: 20,
                widthMin: 0.8,
                widthMax: 1.3,
                opacityMin: 0.1,
                opacityMax: 0.32,
                colors: [
                    "rgba(255,255,255,0.9)",
                    "rgba(238,244,250,0.8)",
                    "rgba(203,219,234,0.7)"
                ]
            },
            foggy: {
                background: "linear-gradient(180deg, rgba(125, 132, 138, 0.9), rgba(28, 32, 36, 1))",
                count: 52,
                speedMin: 0.7,
                speedMax: 1.7,
                drift: 0.12,
                lengthMin: 8,
                lengthMax: 18,
                widthMin: 0.7,
                widthMax: 1.0,
                opacityMin: 0.03,
                opacityMax: 0.14,
                colors: [
                    "rgba(228,235,240,0.18)",
                    "rgba(196,203,212,0.15)",
                    "rgba(170,180,190,0.12)"
                ]
            },
            thunder: {
                background: "linear-gradient(180deg, rgba(20, 25, 32, 1), rgba(6, 10, 16, 1))",
                count: 200,
                speedMin: 3.5,
                speedMax: 6.2,
                drift: 0.5,
                lengthMin: 24,
                lengthMax: 48,
                widthMin: 1.1,
                widthMax: 1.9,
                opacityMin: 0.14,
                opacityMax: 0.5,
                colors: [
                    "rgba(210, 220, 232, 0.88)",
                    "rgba(176, 193, 208, 0.76)",
                    "rgba(129, 142, 158, 0.72)"
                ]
            }
        };

        return configs[mode] || configs.day;
    }

    function updateBackgroundTheme(mode) {
        const config = getSceneConfig(mode);
        document.body.style.background = config.background;
    }

    function buildParticles(mode) {
        const config = getSceneConfig(mode);
        particles = [];

        for (let i = 0; i < config.count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * (config.lengthMax - config.lengthMin) + config.lengthMin,
                width: Math.random() * (config.widthMax - config.widthMin) + config.widthMin,
                speedX: (Math.random() - 0.5) * config.drift,
                speedY: Math.random() * (config.speedMax - config.speedMin) + config.speedMin,
                opacity: Math.random() * (config.opacityMax - config.opacityMin) + config.opacityMin,
                color: config.colors[Math.floor(Math.random() * config.colors.length)],
                sway: Math.random() * Math.PI * 2
            });
        }
    }

    function setSceneForWeather(code, precipitation = 0, isDay = true, time = 12) {
        const scene = getSceneFromWeather(code, precipitation, isDay, time);
        targetScene = scene;
        weatherMode = scene;
        sceneBlend = 0;
        updateBackgroundTheme(scene);
        buildParticles(scene);
    }

    function drawAtmosphere() {
        if (["cloudy", "rain", "foggy", "thunder"].includes(weatherMode)) {
            const cloudCount = weatherMode === "thunder" ? 7 : weatherMode === "rain" ? 8 : 5;

            for (let i = 0; i < cloudCount; i++) {
                const y = (height / (cloudCount + 1)) * (i + 1) + Math.sin((i + 1) * 1.2) * 20;
                const x = ((i + 1) * width) / (cloudCount + 1);
                const cloudAlpha = weatherMode === "foggy" ? 0.08 : weatherMode === "thunder" ? 0.12 : 0.1;
                ctx.fillStyle = `rgba(220, 232, 240, ${cloudAlpha})`;
                ctx.beginPath();
                ctx.ellipse(x, y, width * 0.18 + i * 16, 26 + i * 3, 0, 0, Math.PI * 2);
                ctx.ellipse(x + 110, y + 12, width * 0.11 + i * 12, 22, 0, 0, Math.PI * 2);
                ctx.ellipse(x - 90, y + 8, width * 0.12 + i * 12, 18, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        if (weatherMode === "foggy") {
            for (let i = 0; i < 5; i++) {
                const bandY = (height / 5) * i + Math.sin(i * 1.7) * 18;
                ctx.fillStyle = "rgba(210, 220, 228, 0.06)";
                ctx.fillRect(0, bandY, width, height * 0.09);
            }
        }
    }

    async function fetchWeather() {
        const savedMode = getSavedWeatherMode();
        if (savedMode && savedMode !== "auto") {
            targetScene = savedMode;
            weatherMode = savedMode;
            sceneBlend = 1;
            updateBackgroundTheme(savedMode);
            buildParticles(savedMode);
            return;
        }

        let latitude = 40.7128;
        let longitude = -74.006;

        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: false,
                        timeout: 10000,
                        maximumAge: 600000
                    });
                });
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            } catch {
                // Fallback to New York.
            }
        }

        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,precipitation,is_day&timezone=auto`;
            const response = await fetch(url, { mode: "cors" });

            if (!response.ok) {
                throw new Error("Weather lookup failed");
            }

            const data = await response.json();
            const code = Number(data.current?.weather_code ?? 0);
            const precipitation = Number(data.current?.precipitation ?? 0);
            const isDay = Number(data.current?.is_day ?? 1) === 1;
            const hour = new Date().getHours();
            setSceneForWeather(code, precipitation, isDay, hour);
        } catch {
            setSceneForWeather(0, 0, true, new Date().getHours());
        }
    }

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        buildParticles(weatherMode);
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        if (targetScene !== weatherMode) {
            sceneBlend = Math.min(sceneBlend + 0.035, 1);
            if (sceneBlend >= 1) {
                weatherMode = targetScene;
                sceneBlend = 1;
            }
        }

        const effectiveScene = sceneBlend < 1 && targetScene !== weatherMode
            ? weatherMode
            : targetScene;

        drawWindowGlass(ctx, width, height, effectiveScene);
        drawAtmosphere();

        if (weatherMode === "thunder") {
            lightningTimer -= 1;
            if (lightningTimer <= 0) {
                lightningTimer = Math.random() * 55 + 25;
                lightningFlash = 1;
            }

            if (lightningFlash > 0) {
                lightningFlash -= 0.12;
                const flashAlpha = 0.08 + lightningFlash * 0.32;
                ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
                ctx.fillRect(0, 0, width, height);
            }

            if (Math.random() < 0.13) {
                lightningFlash = Math.max(lightningFlash, 0.9);
            }
        }

        particles.forEach(particle => {
            particle.x += particle.speedX + Math.sin((particle.y + particle.sway) * 0.03) * 0.3;
            particle.y += particle.speedY + Math.cos((particle.x + particle.sway) * 0.02) * 0.22;
            particle.sway += 0.035;

            if (particle.x < -35) particle.x = width + 35;
            if (particle.x > width + 35) particle.x = -35;
            if (particle.y > height + 40) {
                particle.y = -40;
                particle.x = Math.random() * width;
            }

            ctx.globalAlpha = particle.opacity;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = particle.width;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            const trailX = particle.x + Math.sin((particle.y + particle.sway) * 0.06) * 4;
            const trailY = particle.y - particle.length;
            ctx.lineTo(trailX, trailY);
            ctx.stroke();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    const savedMode = getSavedWeatherMode();
    if (savedMode === "auto") {
        buildParticles("day");
        fetchWeather();
    } else {
        targetScene = savedMode;
        weatherMode = savedMode;
        updateBackgroundTheme(savedMode);
        buildParticles(savedMode);
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