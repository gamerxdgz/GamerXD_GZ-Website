"use strict";

/* =========================================
   GamerXD_GZ Website Effects
   Simple, clean, and customizable
========================================= */

/* =========================================
   Performance & State Tracking
========================================= */

let lastFrameTime = performance.now();
let frameCount = 0;
let isTabVisible = true;
const WEATHER_CSS_VARS = {
    '--card-bg-opacity': '0.75',
    '--card-border-opacity': '1',
    '--card-text-color': 'rgba(255, 255, 255, 0.95)',
    '--card-muted-color': 'rgba(255, 255, 255, 0.58)',
    '--card-shadow': '0 14px 36px rgba(0, 120, 255, 0.06)',
    '--card-blur': '8px',
    '--card-border-color': 'rgba(255, 255, 255, 0.08)'
};

document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
});

document.addEventListener("DOMContentLoaded", () => {
    setupGlobalAIButton();
    setupParticles();
    setupScrollAnimations();
    setupCardHover();
});

function drawWindowGlass(ctx, width, height, scene) {
    const config = {
        sunrise: { top: "rgba(255, 196, 132, 0.26)", mid: "rgba(148, 170, 210, 0.08)", bottom: "rgba(15, 20, 29, 0.2)" },
        day: { top: "rgba(255,255,255,0.14)", mid: "rgba(160, 180, 204, 0.08)", bottom: "rgba(12,16,22,0.12)" },
        cloudy: { top: "rgba(210, 218, 228, 0.12)", mid: "rgba(125, 138, 152, 0.08)", bottom: "rgba(12,18,22,0.18)" },
        sunset: { top: "rgba(255, 152, 94, 0.22)", mid: "rgba(163, 130, 104, 0.08)", bottom: "rgba(24, 28, 36, 0.2)" },
        dusk: { top: "rgba(137, 108, 186, 0.2)", mid: "rgba(89, 104, 151, 0.08)", bottom: "rgba(12, 18, 31, 0.2)" },
        night: { top: "rgba(118, 136, 170, 0.18)", mid: "rgba(67, 80, 98, 0.08)", bottom: "rgba(8, 12, 18, 0.22)" },
        rain: { top: "rgba(141, 168, 191, 0.18)", mid: "rgba(86, 101, 118, 0.08)", bottom: "rgba(10, 16, 24, 0.22)" },
        snowy: { top: "rgba(228, 234, 240, 0.2)", mid: "rgba(160, 180, 196, 0.08)", bottom: "rgba(32, 40, 50, 0.18)" },
        foggy: { top: "rgba(200, 208, 214, 0.16)", mid: "rgba(120, 126, 136, 0.08)", bottom: "rgba(24, 30, 36, 0.18)" },
        thunder: { top: "rgba(95, 109, 124, 0.22)", mid: "rgba(62, 74, 86, 0.08)", bottom: "rgba(5, 10, 16, 0.24)" }
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
    gloss.addColorStop(0, "rgba(255,255,255,0.16)");
    gloss.addColorStop(0.3, "rgba(255,255,255,0.05)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gloss;
    ctx.fillRect(0, 0, width, height);
}

/* =========================================
   Background Weather System
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

    if (!validModes.includes(mode)) return;
    if (mode === "auto") localStorage.removeItem(WEATHER_MODE_KEY);
    else localStorage.setItem(WEATHER_MODE_KEY, mode);

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
    let rainDrops = [];
    let snowFlakes = [];
    let cloudLayers = [];
    let lightningFlash = 0;
    let lightningTimer = 0;
    let stars = [];

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
            buildWeather(mode);
        }
    };

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function getSceneFromWeather(code, precipitation, isDay, hour) {
        const morning = hour >= 5 && hour < 8;
        const sunrise = hour >= 8 && hour < 9;
        const sunset = hour >= 17 && hour < 19;
        const dusk = hour >= 19 && hour < 21;
        const night = !isDay || hour >= 21 || hour < 5;

        if ([95, 96, 99].includes(code)) return "thunder";
        if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
        if ([45, 48].includes(code)) return "foggy";
        if (precipitation > 0.5 || [61, 63, 65, 80, 81, 82, 51, 55, 56].includes(code)) return "rain";
        if (morning || sunrise) return "sunrise";
        if (sunset) return "sunset";
        if (dusk) return "dusk";
        if (night) return "night";
        return "day";
    }

    function rgbaFromRgb(r, g, b, a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    function getSceneConfig(mode) {
        const configs = {
            sunrise: {
                skyTop: [18, 28, 52],
                skyMid: [96, 82, 123],
                skyBottom: [255, 170, 105],
                horizon: [255, 205, 132],
                sun: [255, 182, 92],
                moon: [214, 225, 255],
                cloud: [246, 220, 205],
                cloudShade: [145, 137, 162],
                rain: [188, 211, 232],
                fog: [245, 222, 197],
                ambient: 0.8,
                cloudOpacity: 0.72,
                fogOpacity: 0.18,
                daylight: 0.78,
                rainDensity: 0.4,
                lightning: 0.14
            },
            day: {
                skyTop: [36, 68, 116],
                skyMid: [125, 165, 204],
                skyBottom: [214, 230, 245],
                horizon: [240, 245, 255],
                sun: [255, 220, 120],
                moon: [205, 220, 255],
                cloud: [255, 255, 255],
                cloudShade: [189, 197, 210],
                rain: [200, 220, 235],
                fog: [232, 238, 245],
                ambient: 1,
                cloudOpacity: 0.75,
                fogOpacity: 0.12,
                daylight: 1,
                rainDensity: 0.2,
                lightning: 0.05
            },
            cloudy: {
                skyTop: [44, 52, 66],
                skyMid: [118, 131, 149],
                skyBottom: [182, 195, 207],
                horizon: [219, 224, 230],
                sun: [244, 229, 196],
                moon: [210, 223, 240],
                cloud: [222, 229, 236],
                cloudShade: [163, 172, 183],
                rain: [182, 196, 210],
                fog: [220, 226, 232],
                ambient: 0.75,
                cloudOpacity: 0.62,
                fogOpacity: 0.14,
                daylight: 0.72,
                rainDensity: 0.12,
                lightning: 0.08
            },
            sunset: {
                skyTop: [30, 28, 48],
                skyMid: [120, 68, 92],
                skyBottom: [255, 135, 75],
                horizon: [255, 200, 128],
                sun: [255, 144, 68],
                moon: [201, 214, 255],
                cloud: [255, 205, 160],
                cloudShade: [147, 90, 90],
                rain: [205, 216, 234],
                fog: [255, 181, 142],
                ambient: 0.82,
                cloudOpacity: 0.7,
                fogOpacity: 0.2,
                daylight: 0.66,
                rainDensity: 0.25,
                lightning: 0.1
            },
            dusk: {
                skyTop: [18, 24, 46],
                skyMid: [70, 72, 125],
                skyBottom: [140, 118, 177],
                horizon: [196, 154, 224],
                sun: [174, 148, 255],
                moon: [205, 220, 255],
                cloud: [216, 220, 246],
                cloudShade: [116, 112, 152],
                rain: [166, 183, 214],
                fog: [186, 177, 217],
                ambient: 0.62,
                cloudOpacity: 0.7,
                fogOpacity: 0.18,
                daylight: 0.42,
                rainDensity: 0.18,
                lightning: 0.08
            },
            night: {
                skyTop: [3, 9, 18],
                skyMid: [23, 36, 57],
                skyBottom: [64, 74, 112],
                horizon: [105, 119, 170],
                sun: [204, 219, 255],
                moon: [236, 243, 255],
                cloud: [190, 206, 227],
                cloudShade: [103, 116, 148],
                rain: [170, 180, 205],
                fog: [151, 170, 206],
                ambient: 0.28,
                cloudOpacity: 0.46,
                fogOpacity: 0.16,
                daylight: 0.14,
                rainDensity: 0.1,
                lightning: 0.12
            },
            rain: {
                skyTop: [25, 37, 52],
                skyMid: [56, 70, 88],
                skyBottom: [23, 32, 42],
                horizon: [118, 138, 164],
                sun: [179, 201, 223],
                moon: [210, 224, 242],
                cloud: [186, 198, 214],
                cloudShade: [86, 100, 116],
                rain: [182, 204, 224],
                fog: [155, 171, 186],
                ambient: 0.48,
                cloudOpacity: 0.76,
                fogOpacity: 0.34,
                daylight: 0.42,
                rainDensity: 0.82,
                lightning: 0.06
            },
            snowy: {
                skyTop: [150, 172, 190],
                skyMid: [190, 206, 220],
                skyBottom: [228, 236, 242],
                horizon: [242, 246, 250],
                sun: [249, 253, 255],
                moon: [227, 235, 245],
                cloud: [242, 247, 250],
                cloudShade: [176, 186, 196],
                rain: [229, 238, 246],
                fog: [234, 239, 245],
                ambient: 0.7,
                cloudOpacity: 0.8,
                fogOpacity: 0.22,
                daylight: 0.7,
                rainDensity: 0.18,
                lightning: 0.03
            },
            foggy: {
                skyTop: [101, 108, 116],
                skyMid: [151, 158, 167],
                skyBottom: [193, 201, 208],
                horizon: [207, 215, 221],
                sun: [221, 232, 242],
                moon: [220, 228, 238],
                cloud: [219, 225, 232],
                cloudShade: [145, 150, 159],
                rain: [204, 216, 225],
                fog: [209, 218, 224],
                ambient: 0.54,
                cloudOpacity: 0.65,
                fogOpacity: 0.48,
                daylight: 0.54,
                rainDensity: 0.04,
                lightning: 0.04
            },
            thunder: {
                skyTop: [10, 16, 20],
                skyMid: [40, 48, 60],
                skyBottom: [26, 30, 36],
                horizon: [102, 115, 132],
                sun: [182, 197, 215],
                moon: [196, 208, 226],
                cloud: [126, 136, 145],
                cloudShade: [48, 56, 62],
                rain: [176, 195, 214],
                fog: [102, 112, 122],
                ambient: 0.26,
                cloudOpacity: 0.95,
                fogOpacity: 0.38,
                daylight: 0.2,
                rainDensity: 1,
                lightning: 0.72
            }
        };
        return configs[mode] || configs.day;
    }

    function updateBackgroundTheme(mode) {
        const config = getSceneConfig(mode);
        document.body.style.background = `linear-gradient(180deg, rgba(${config.skyTop[0]}, ${config.skyTop[1]}, ${config.skyTop[2]}, 0.98), rgba(${config.skyBottom[0]}, ${config.skyBottom[1]}, ${config.skyBottom[2]}, 1))`;
    }

    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    function createCloudFormation(mode, layerIndex, width, height) {
        const weatherProfile = {
            sunrise: { low: 5, mid: 4, high: 3, alpha: [0.14, 0.28], spread: [0.12, 0.34], base: [90, 170], height: [18, 50] },
            day: { low: 6, mid: 5, high: 4, alpha: [0.12, 0.2], spread: [0.08, 0.24], base: [110, 220], height: [16, 44] },
            cloudy: { low: 8, mid: 6, high: 4, alpha: [0.12, 0.24], spread: [0.12, 0.3], base: [140, 260], height: [18, 52] },
            sunset: { low: 6, mid: 5, high: 3, alpha: [0.15, 0.28], spread: [0.14, 0.36], base: [110, 210], height: [18, 48] },
            dusk: { low: 5, mid: 5, high: 4, alpha: [0.12, 0.22], spread: [0.1, 0.3], base: [100, 200], height: [16, 44] },
            night: { low: 4, mid: 4, high: 5, alpha: [0.08, 0.18], spread: [0.08, 0.22], base: [70, 170], height: [14, 36] },
            rain: { low: 9, mid: 6, high: 5, alpha: [0.15, 0.32], spread: [0.18, 0.42], base: [150, 290], height: [22, 58] },
            snowy: { low: 6, mid: 5, high: 4, alpha: [0.12, 0.22], spread: [0.1, 0.26], base: [90, 200], height: [18, 46] },
            foggy: { low: 4, mid: 4, high: 3, alpha: [0.08, 0.18], spread: [0.08, 0.2], base: [70, 150], height: [14, 36] },
            thunder: { low: 10, mid: 7, high: 4, alpha: [0.17, 0.36], spread: [0.2, 0.52], base: [180, 330], height: [26, 62] }
        }[mode] || { low: 6, mid: 5, high: 4, alpha: [0.12, 0.2], spread: [0.08, 0.24], base: [110, 220], height: [16, 44] };

        const layerType = layerIndex <= 1 ? "high" : layerIndex === 2 ? "mid" : "low";
        const tier = layerType === "low" ? 0 : layerType === "mid" ? 1 : 2;
        const baseSize = randomBetween(weatherProfile.base[0], weatherProfile.base[1]);
        const cloudHeight = randomBetween(weatherProfile.height[0], weatherProfile.height[1]);
        const x = randomBetween(-width * 0.35, width * 1.25);
        const y = height * (0.14 + layerIndex * 0.12 + Math.random() * 0.12) + randomBetween(-22, 26);
        const speed = randomBetween(0.15, 0.9) * (tier === 0 ? 1.6 : tier === 1 ? 1.15 : 0.8) * (mode === "thunder" ? 1.3 : 1);
        const direction = Math.random() > 0.5 ? 1 : -1;
        const alpha = randomBetween(weatherProfile.alpha[0], weatherProfile.alpha[1]);
        const density = randomBetween(0.55, 1.25);
        const lobeCount = Math.min(10, Math.max(4, Math.round(weatherProfile.low + randomBetween(-1.5, 2.5) + tier * 1.4)));
        const lobes = [];

        for (let i = 0; i < lobeCount; i++) {
            const offset = (i / lobeCount) * 2 - 1;
            const rx = baseSize * randomBetween(0.52, 1.12) * (0.85 + density * 0.2);
            const ry = cloudHeight * randomBetween(0.8, 1.6) * (0.65 + density * 0.25);
            const xOffset = offset * baseSize * randomBetween(0.2, 0.82) + randomBetween(-25, 25);
            const yOffset = randomBetween(-ry * 0.5, ry * 0.44) + (tier === 0 ? -6 : 0);
            lobes.push({
                x: xOffset,
                y: yOffset,
                rx,
                ry,
                rot: randomBetween(-0.5, 0.7),
                shade: randomBetween(0.7, 1.2),
                brightness: randomBetween(0.78, 1.35)
            });
        }

        return {
            x,
            y,
            width: baseSize * 1.4,
            height: cloudHeight,
            alpha,
            speed,
            direction,
            baseAlpha: alpha,
            density,
            layerIndex,
            lobeCount,
            seed: Math.random() * 1000,
            drift: randomBetween(0.15, 1.7),
            lobes,
            shadowBias: randomBetween(0.2, 0.9),
            sunlightBias: randomBetween(0.15, 0.8),
            movementPhase: Math.random() * Math.PI * 2,
            cloudType: ["scattered", "broad", "cumulus", "bank"][Math.floor(Math.random() * 4)]
        };
    }

    function buildWeather(mode) {
        const total = clamp(Math.round((width * height) / 18), 40, 220);

        rainDrops = [];
        snowFlakes = [];
        cloudLayers = [];
        stars = [];

        if (mode === "rain" || mode === "thunder") {
            const rainCount = mode === "thunder" ? total + 70 : total;
            for (let i = 0; i < rainCount; i++) {
                rainDrops.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 1 + 0.2,
                    len: 8 + Math.random() * 16,
                    speed: 8 + Math.random() * 22,
                    opacity: 0.25 + Math.random() * 0.6,
                    drift: (Math.random() - 0.5) * 1.2,
                    width: 0.7 + Math.random() * 1.4
                });
            }
        }

        if (mode === "snowy") {
            const snowCount = total + 40;
            for (let i = 0; i < snowCount; i++) {
                snowFlakes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: 1 + Math.random() * 3.2,
                    speed: 0.6 + Math.random() * 1.4,
                    drift: (Math.random() - 0.5) * 1.8,
                    opacity: 0.35 + Math.random() * 0.65,
                    twinkle: Math.random() * Math.PI * 2
                });
            }
        }

        if (["cloudy", "sunrise", "sunset", "dusk", "rain", "foggy", "thunder", "day", "night"].includes(mode)) {
            const layerCount = mode === "thunder" ? 5 : mode === "rain" ? 4 : 3;
            const desiredClouds = mode === "thunder" ? 26 : mode === "rain" ? 22 : mode === "cloudy" ? 18 : 12;

            for (let layer = 0; layer < layerCount; layer++) {
                const cloudCount = Math.max(4, Math.round(desiredClouds / (layerCount - layer + 1)) + Math.random() * 5);
                for (let i = 0; i < cloudCount; i++) {
                    cloudLayers.push(createCloudFormation(mode, layer, width, height));
                }
            }
        }

        if (mode === "night") {
            const starCount = clamp(Math.round(width * height / 18), 100, 400);
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.6,
                    r: 0.7 + Math.random() * 2.4,
                    alpha: 0.2 + Math.random() * 0.8,
                    twinkle: Math.random() * Math.PI * 2
                });
            }
        }
    }

    function drawStars() {
        if (weatherMode !== "night" && weatherMode !== "dusk") return;
        stars.forEach(star => {
            const twinkle = 0.45 + Math.sin((performance.now() * 0.001) + star.twinkle) * 0.55;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${star.alpha * twinkle})`;
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawSunMoon(scene) {
        const config = getSceneConfig(scene);
        const timeRatio = weatherMode === "night" ? 0.15 : weatherMode === "dusk" ? 0.32 : weatherMode === "sunset" ? 0.55 : weatherMode === "sunrise" ? 0.4 : weatherMode === "rain" ? 0.26 : 0.7;
        const sunX = width * (0.18 + timeRatio * 0.64);
        const sunY = height * (0.26 + Math.sin(timeRatio * Math.PI) * 0.18);

        const glowSize = Math.min(width, height) * 0.22;
        ctx.save();

        const glow = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, glowSize);
        glow.addColorStop(0, rgbaFromRgb(config.sun[0], config.sun[1], config.sun[2], 0.85));
        glow.addColorStop(0.25, rgbaFromRgb(config.sun[0], config.sun[1], config.sun[2], 0.36));
        glow.addColorStop(0.55, rgbaFromRgb(config.sun[0], config.sun[1], config.sun[2], 0.12));
        glow.addColorStop(1, rgbaFromRgb(config.sun[0], config.sun[1], config.sun[2], 0));
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        if (scene !== "night") {
            ctx.beginPath();
            ctx.fillStyle = rgbaFromRgb(config.sun[0], config.sun[1], config.sun[2], 0.95);
            ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = rgbaFromRgb(config.sun[0], config.sun[1], config.sun[2], 0.18);
            ctx.arc(sunX, sunY, 38 + glowSize * 0.08, 0, Math.PI * 2);
            ctx.fill();
        }

        if (scene === "night" || scene === "dusk") {
            const moonX = width * 0.76;
            const moonY = height * 0.22;
            const moonGlow = ctx.createRadialGradient(moonX, moonY, 12, moonX, moonY, 90);
            moonGlow.addColorStop(0, rgbaFromRgb(config.moon[0], config.moon[1], config.moon[2], 0.95));
            moonGlow.addColorStop(0.25, rgbaFromRgb(config.moon[0], config.moon[1], config.moon[2], 0.35));
            moonGlow.addColorStop(1, rgbaFromRgb(config.moon[0], config.moon[1], config.moon[2], 0));
            ctx.fillStyle = moonGlow;
            ctx.fillRect(0, 0, width, height);

            ctx.beginPath();
            ctx.fillStyle = rgbaFromRgb(config.moon[0], config.moon[1], config.moon[2], 0.9);
            ctx.arc(moonX, moonY, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "rgba(35,45,58,0.12)";
            ctx.arc(moonX - 6, moonY - 2, 16, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    function respawnCloud(layer, mode) {
        const next = createCloudFormation(mode, layer.layerIndex, width, height);
        Object.assign(layer, next);
    }

    function drawCloudLayer(layer) {
        const config = getSceneConfig(weatherMode);
        const t = performance.now() * 0.00055;
        layer.x += layer.speed * layer.direction * 0.28;
        layer.y += Math.sin(t * 4 + layer.seed) * 0.12;

        const cloudX = layer.x;
        const cloudY = layer.y + Math.sin(t * 2.2 + layer.seed) * (8 + layer.layerIndex * 5) + Math.cos((t * 1.5) + layer.seed * 0.7) * 6;
        const timeRatio = weatherMode === "night" ? 0.15 : weatherMode === "dusk" ? 0.32 : weatherMode === "sunset" ? 0.55 : weatherMode === "sunrise" ? 0.4 : weatherMode === "rain" ? 0.26 : 0.7;
        const sunX = width * (0.18 + timeRatio * 0.64);
        const sunY = height * (0.26 + Math.sin(timeRatio * Math.PI) * 0.18);

        if (cloudX > width + 260 || cloudX < -260) {
            respawnCloud(layer, weatherMode);
            return;
        }

        ctx.save();
        ctx.translate(cloudX, cloudY);
        ctx.filter = "blur(0.8px)";
        ctx.globalAlpha = clamp(config.cloudOpacity * layer.baseAlpha * (0.72 + layer.layerIndex * 0.22), 0.08, 0.82);

        const cloudGradient = ctx.createRadialGradient(
            (sunX - cloudX) * 0.35,
            (sunY - cloudY) * 0.15,
            20,
            0,
            0,
            Math.max(layer.width, 110)
        );
        cloudGradient.addColorStop(0, rgbaFromRgb(config.cloud[0], config.cloud[1], config.cloud[2], 0.95));
        cloudGradient.addColorStop(0.38, rgbaFromRgb(config.cloud[0], config.cloud[1], config.cloud[2], 0.8));
        cloudGradient.addColorStop(0.72, rgbaFromRgb(config.cloudShade[0], config.cloudShade[1], config.cloudShade[2], 0.6));
        cloudGradient.addColorStop(1, rgbaFromRgb(config.cloudShade[0], config.cloudShade[1], config.cloudShade[2], 0.08));

        ctx.beginPath();
        layer.lobes.forEach(lobe => {
            ctx.ellipse(lobe.x, lobe.y, lobe.rx, lobe.ry, lobe.rot, 0, Math.PI * 2);
        });
        ctx.closePath();
        ctx.fillStyle = cloudGradient;
        ctx.fill();

        ctx.globalAlpha = clamp(layer.baseAlpha * 0.6, 0.08, 0.44);
        ctx.fillStyle = rgbaFromRgb(config.cloudShade[0], config.cloudShade[1], config.cloudShade[2], 0.35);
        ctx.beginPath();
        layer.lobes.forEach(lobe => {
            ctx.ellipse(lobe.x + lobe.rx * 0.1, lobe.y + lobe.ry * 0.18, Math.max(12, lobe.rx * 0.38), Math.max(8, lobe.ry * 0.38), lobe.rot, 0, Math.PI * 2);
        });
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    function drawSky() {
        const config = getSceneConfig(weatherMode);
        const top = config.skyTop;
        const mid = config.skyMid;
        const bottom = config.skyBottom;

        const sky = ctx.createLinearGradient(0, 0, 0, height);
        sky.addColorStop(0, rgbaFromRgb(top[0], top[1], top[2], 1));
        sky.addColorStop(0.42, rgbaFromRgb(mid[0], mid[1], mid[2], 0.92));
        sky.addColorStop(0.85, rgbaFromRgb(bottom[0], bottom[1], bottom[2], 0.8));
        sky.addColorStop(1, rgbaFromRgb(18, 22, 28, 1));
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, width, height);

        const horizonGlow = ctx.createRadialGradient(width * 0.5, height * 0.86, 20, width * 0.5, height * 0.9, width * 0.7);
        horizonGlow.addColorStop(0, rgbaFromRgb(config.horizon[0], config.horizon[1], config.horizon[2], 0.28));
        horizonGlow.addColorStop(0.45, rgbaFromRgb(config.horizon[0], config.horizon[1], config.horizon[2], 0.12));
        horizonGlow.addColorStop(1, rgbaFromRgb(config.horizon[0], config.horizon[1], config.horizon[2], 0));
        ctx.fillStyle = horizonGlow;
        ctx.fillRect(0, 0, width, height);

        drawStars();
        drawSunMoon(weatherMode);

        if (cloudLayers.length > 0) {
            cloudLayers.forEach(drawCloudLayer);
        }
    }

    function drawRain() {
        if (!rainDrops.length) return;
        const config = getSceneConfig(weatherMode);

        rainDrops.forEach(drop => {
            const x = drop.x;
            const y = drop.y;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + drop.drift * 4, y + drop.len);
            ctx.strokeStyle = rgbaFromRgb(config.rain[0], config.rain[1], config.rain[2], drop.opacity);
            ctx.lineWidth = drop.width;
            ctx.stroke();
        });

        rainDrops.forEach(drop => {
            drop.y += drop.speed * (0.7 + drop.z);
            drop.x += drop.drift * (0.6 + drop.z);
            if (drop.y > height + 20) {
                drop.y = -20;
                drop.x = Math.random() * width;
            }
            if (drop.x < -20) drop.x = width + 20;
            if (drop.x > width + 20) drop.x = -20;
        });
    }

    function drawSnow() {
        if (!snowFlakes.length) return;
        snowFlakes.forEach(flake => {
            const twinkle = 0.3 + (Math.sin((performance.now() * 0.0025) + flake.twinkle) + 1) * 0.35;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255,255,255,${flake.opacity * twinkle})`;
            ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
            ctx.fill();
        });

        snowFlakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += flake.drift;
            if (flake.y > height + 10) {
                flake.y = -10;
                flake.x = Math.random() * width;
            }
            if (flake.x < -10) flake.x = width + 10;
            if (flake.x > width + 10) flake.x = -10;
        });
    }

    function drawFog() {
        if (weatherMode !== "foggy" && weatherMode !== "rain" && weatherMode !== "thunder") return;
        const alpha = weatherMode === "thunder" ? 0.18 : weatherMode === "rain" ? 0.12 : 0.16;
        const config = getSceneConfig(weatherMode);
        for (let i = 0; i < 6; i++) {
            const bandY = (height / 6) * i + Math.sin(i * 1.4 + performance.now() * 0.0003) * 30;
            ctx.fillStyle = rgbaFromRgb(config.fog[0], config.fog[1], config.fog[2], alpha);
            ctx.fillRect(0, bandY, width, height * 0.12);
        }
    }

    function drawLightning() {
        if (weatherMode !== "thunder") return;
        lightningTimer -= 1;
        if (lightningTimer <= 0) {
            lightningTimer = Math.random() * 90 + 35;
            lightningFlash = 1;
        }

        if (lightningFlash > 0) {
            lightningFlash -= 0.12;
            const flashAlpha = 0.08 + lightningFlash * 0.52;
            ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
            ctx.fillRect(0, 0, width, height);
        }

        if (Math.random() < 0.18 && lightningFlash < 0.2) {
            lightningFlash = 1;
        }

        if (lightningFlash > 0.6 && Math.random() < 0.2) {
            const startX = Math.random() * width;
            const startY = Math.random() * height * 0.4;
            const endX = startX + (Math.random() - 0.5) * 180;
            const endY = startY + 180 + Math.random() * 220;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.lineWidth = 2 + Math.random() * 4;
            ctx.strokeStyle = `rgba(255,255,255,${0.3 + lightningFlash * 0.5})`;
            ctx.stroke();

            for (let i = 0; i < 3; i++) {
                const branchX = startX + (Math.random() - 0.5) * 90;
                const branchY = startY + 50 + Math.random() * 120;
                ctx.beginPath();
                ctx.moveTo(endX, endY);
                ctx.lineTo(branchX, branchY);
                ctx.strokeStyle = `rgba(255,255,255,${0.2 + lightningFlash * 0.35})`;
                ctx.stroke();
            }
        }
    }

    function updateCardStyling(mode) {
        const brightModes = ["day", "sunrise", "snowy", "cloudy"];
        const darkModes = ["night", "rain", "foggy", "thunder"];
        const warmModes = ["sunrise", "sunset", "dusk"];

        if (darkModes.includes(mode)) {
            document.documentElement.style.setProperty('--card-bg-opacity', '0.82');
            document.documentElement.style.setProperty('--card-border-opacity', '1.2');
            document.documentElement.style.setProperty('--card-text-color', 'rgba(255, 255, 255, 1)');
            document.documentElement.style.setProperty('--card-muted-color', 'rgba(255, 255, 255, 0.68)');
            document.documentElement.style.setProperty('--card-shadow', '0 14px 40px rgba(0, 100, 200, 0.1)');
            document.documentElement.style.setProperty('--card-blur', '12px');
            document.documentElement.style.setProperty('--card-border-color', 'rgba(100, 180, 255, 0.15)');
        } else if (brightModes.includes(mode)) {
            document.documentElement.style.setProperty('--card-bg-opacity', '0.68');
            document.documentElement.style.setProperty('--card-border-opacity', '0.9');
            document.documentElement.style.setProperty('--card-text-color', 'rgba(255, 255, 255, 0.98)');
            document.documentElement.style.setProperty('--card-muted-color', 'rgba(255, 255, 255, 0.62)');
            document.documentElement.style.setProperty('--card-shadow', '0 12px 32px rgba(0, 120, 255, 0.08)');
            document.documentElement.style.setProperty('--card-blur', '10px');
            document.documentElement.style.setProperty('--card-border-color', 'rgba(255, 255, 255, 0.1)');
        } else if (warmModes.includes(mode)) {
            document.documentElement.style.setProperty('--card-bg-opacity', '0.72');
            document.documentElement.style.setProperty('--card-border-opacity', '0.95');
            document.documentElement.style.setProperty('--card-text-color', 'rgba(255, 255, 255, 0.96)');
            document.documentElement.style.setProperty('--card-muted-color', 'rgba(255, 255, 255, 0.60)');
            document.documentElement.style.setProperty('--card-shadow', '0 14px 36px rgba(255, 100, 50, 0.08)');
            document.documentElement.style.setProperty('--card-blur', '9px');
            document.documentElement.style.setProperty('--card-border-color', 'rgba(255, 200, 100, 0.12)');
        } else {
            Object.entries(WEATHER_CSS_VARS).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
            });
        }
    }

    function renderFrame(currentTime = performance.now()) {
        if (!isTabVisible) {
            requestAnimationFrame(renderFrame);
            return;
        }

        const deltaTime = Math.min((currentTime - lastFrameTime) / 1000, 0.033);
        lastFrameTime = currentTime;
        frameCount++;

        ctx.clearRect(0, 0, width, height);

        if (targetScene !== weatherMode) {
            sceneBlend = clamp(sceneBlend + 0.035, 0, 1);
            if (sceneBlend >= 1) {
                weatherMode = targetScene;
                sceneBlend = 1;
                updateCardStyling(weatherMode);
            }
        } else {
            sceneBlend = 1;
        }

        const activeScene = targetScene === weatherMode ? weatherMode : weatherMode;
        drawWindowGlass(ctx, width, height, activeScene);
        drawSky();
        drawRain();
        drawSnow();
        drawFog();
        drawLightning();

        ctx.globalAlpha = 1;
        requestAnimationFrame(renderFrame);
    }

    async function fetchWeather(useLocation = false) {
        const savedMode = getSavedWeatherMode();
        if (savedMode && savedMode !== "auto") {
            targetScene = savedMode;
            weatherMode = savedMode;
            sceneBlend = 1;
            updateBackgroundTheme(savedMode);
            buildWeather(savedMode);
            updateCardStyling(savedMode);
            return;
        }

        let latitude = 40.7128;
        let longitude = -74.006;
        let locationFound = false;

        if (useLocation && navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: false,
                        timeout: 8000,
                        maximumAge: 600000
                    });
                });
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                locationFound = true;
            } catch {
                // fallback to default location
            }
        }

        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,precipitation,is_day&timezone=auto`;
            const response = await fetch(url, { mode: "cors" });
            if (!response.ok) throw new Error("Weather lookup failed");

            const data = await response.json();
            const code = Number(data.current?.weather_code ?? 0);
            const precipitation = Number(data.current?.precipitation ?? 0);
            const isDay = Number(data.current?.is_day ?? 1) === 1;
            const hour = new Date().getHours();
            const nextScene = getSceneFromWeather(code, precipitation, isDay, hour);
            targetScene = nextScene;
            weatherMode = nextScene;
            sceneBlend = 1;
            updateBackgroundTheme(nextScene);
            buildWeather(nextScene);
            updateCardStyling(nextScene);
        } catch {
            const fallbackScene = getSceneFromWeather(0, 0, true, new Date().getHours());
            targetScene = fallbackScene;
            weatherMode = fallbackScene;
            sceneBlend = 1;
            updateBackgroundTheme(fallbackScene);
            buildWeather(fallbackScene);
            updateCardStyling(fallbackScene);
        }
    }

    window.fetchWeatherWithLocation = fetchWeather;

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        buildWeather(weatherMode);
    });

    const savedMode = getSavedWeatherMode();
    const enableAutoLocation = localStorage.getItem("gamerxdgz_location_enabled") === "true";

    if (savedMode === "auto") {
        buildWeather("day");
        updateCardStyling("day");
        if (enableAutoLocation) {
            fetchWeather(true);
        } else {
            fetchWeather(false);
        }
    } else {
        targetScene = savedMode;
        weatherMode = savedMode;
        updateBackgroundTheme(savedMode);
        buildWeather(savedMode);
        updateCardStyling(savedMode);
    }

    renderFrame();
}

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