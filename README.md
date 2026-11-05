# Sanket Valunj — Portfolio v2

Plain HTML/CSS/JS with GSAP, ScrollTrigger and Lenis bundled in `js/vendor/`, so no install is needed.

## Run
Open `index.html` in a browser, or use VS Code **Live Server** (recommended).

## Structure
```
index.html          all text content and sections
css/style.css       colours at the top (:root), then one block per section
js/main.js          animations; ROLES, STACK_JSON and STACK data at the top
js/vendor/          gsap, ScrollTrigger, lenis (don't edit)
assets/             hero.jpg (home background), profile.jpg, resume PDF
```

## How it behaves
- **Desktop (≥ 900px):** scrolling down moves the page sideways. Each section rolls in 3D as it enters and leaves.
- **Mobile:** sections stack vertically, and Journey and Projects become swipeable card rows.
- Loader → letter-by-letter name reveal → rotating role → terminal typing `cat stack.json`.

## Quick edits
- Rotating roles: `ROLES` in `js/main.js`
- Terminal JSON: `STACK_JSON` in `js/main.js`
- Stack tiles and their descriptions: `STACK` in `js/main.js`
- Accent colours: `--violet`, `--cyan` in `css/style.css`
- Roll strength: in `js/main.js` find `rotateY: -o * 24` (degrees) and `scale: 1 - Math.abs(o) * .1`
- Hero photo: replace `assets/hero.jpg` (wide 16:9 image with you on the right works best)

## Deploy
Push to GitHub and import into Vercel or Netlify. It's a static site, so no build settings are needed.
# sanket-portfolio
