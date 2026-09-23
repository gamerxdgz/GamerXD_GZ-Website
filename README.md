# GamerXD_GZ Website

Static site for GamerXD_GZ — no build step, no frameworks. Deploy as-is to GitHub Pages or Cloudflare Pages.

## Structure
- `index.html` — Home
- `about.html` — About
- `discord.html` — Both Discord servers, with join links
- `minecraft.html` — LifeSteal SMP server page
- `404.html` — Not found page
- `style.css` — Shared stylesheet (design tokens at the top)
- `script.js` — Mobile nav toggle + footer year
- `assets/logo.png` — Existing site logo (unchanged)

## Editing
- Two Discord invites are used: `https://discord.gg/4BHUKrzXRf` is the main server (header, footer, and most CTAs), and `https://discord.gg/CgfPRMrCQH` is the Minecraft server, used on `minecraft.html` and the Minecraft section of `discord.html`.
- Colors, fonts, and corner radius are all controlled by the `:root` variables at the top of `style.css`.

## License
MIT — see `LICENSE`. Free to use, modify, and redistribute; just keep the copyright notice. The `assets/logo.png` mark is GamerXD_GZ's own branding, so please don't reuse it for a different project.
