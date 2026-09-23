# GamerXD_GZ Website

Static site for GamerXD_GZ — no build step, no frameworks. Deploy as-is to GitHub Pages or Cloudflare Pages.

## Structure
- `index.html` — Home
- `about.html` — About
- `projects.html` — Launcher, anti-cheat, and client projects
- `minecraft.html` — LifeSteal SMP server page
- `404.html` — Not found page
- `style.css` — Shared stylesheet (design tokens at the top)
- `script.js` — Mobile nav toggle + footer year
- `assets/logo.png` — Existing site logo (unchanged)

## Editing
- Two Discord invites are used: `https://discord.gg/4BHUKrzXRf` is the main server (header, footer, and every page's general CTA), and `https://discord.gg/CgfPRMrCQH` is the Minecraft server, used only on `minecraft.html`'s "Get the IP on Discord" and "Join Discord" buttons.
- Colors, fonts, and corner radius are all controlled by the `:root` variables at the top of `style.css`.

## License
MIT — see `LICENSE`. Free to use, modify, and redistribute; just keep the copyright notice. The `assets/logo.png` mark is GamerXD_GZ's own branding, so please don't reuse it for a different project.
