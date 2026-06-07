# Lynn Germain — Handmade Beaded Jewelry

Static showcase site (HTML / CSS / vanilla JS). No build step, no dependencies.
Hostable anywhere: Netlify drag-drop, Vercel, GitHub Pages, or any static host.

## Run locally
```
cd site
python3 -m http.server 8753
# open http://localhost:8753
```

## Before going live — remaining edit
- **Email** is set to `lynn.germain@gmail.com` (contact button + footer in `index.html`,
  `LYNN_EMAIL` constant in `script.js`). Change there if it ever moves.
- **Placeholder copy.** Sections marked `<!-- PLACEHOLDER COPY -->` in `index.html`
   (hero lede, the creed quote, the "Meet Lynn" bio). Swap in Lynn's real words.
   No invented facts were used — it's elegant-but-generic on purpose.

## Structure
```
site/
  index.html      content + structure
  styles.css      "Atelier" design system (bone / teal / copper, Fraunces + Hanken Grotesk)
  script.js       nav, scroll-reveal, gallery filter, lightbox, mailto form
  images/         web-optimized (3.3 MB total, sourced from /assets originals)
    hero.webp/.jpg, atelier.webp, headshot.webp
    gallery/<slug>.webp        (grid, ~1000px)
    gallery/<slug>-full.webp   (lightbox, ~1900px)
```

## Images
13 pieces curated from the 55 originals in `../assets/`. Originals are ~20 MB each
(7728×5152) — far too heavy for web. The web copies are EXIF-rotated and re-encoded.
To re-curate: edit the `gallery` list in the source optimizer and re-run against `../assets/`.

## Contact form
The form has no backend — on submit it opens the visitor's email app with a
pre-filled message addressed to Lynn (mailto). Works on any static host with zero setup.
