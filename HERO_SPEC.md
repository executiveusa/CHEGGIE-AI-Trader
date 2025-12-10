# HERO_SPEC — Cheggie Lifestyle Finance

- **Component:** `src/components/hero/HeroFull.tsx`
- **Imagery:** Unsplash Cypress beach + skyline (URL in `HERO_IMAGE_URL`), gradient overlays, radial glow accent.
- **Video:** Silent autoplay Pexels clip (Vimeo CDN). Poster matches hero imagery, ensures iOS autoplay compliance (`playsInline`, `muted`).
- **Copy:**
  - Headline: “Design Wealth. Live Free.”
  - Subtext: “Your lifestyle, powered by financial intelligence.”
  - CTA Primary: `/signup`
  - CTA Secondary: `/learn`
- **Highlight List:** Flowwise Agents, Lifestyle Intelligence, Wealth Intelligence Loop.
- **Layout:** `min-h-[100svh]`, flex column, gradient overlays, highlight cards responsive to `sm:grid-cols-2`.
- **Accessibility:** `aria-labelledby="hero-heading"`, video poster, descriptive alt text for hero image.
- **Performance:** Lazy hero video, remote assets compressed via Unsplash/Pexels query params, no blocking fonts.
