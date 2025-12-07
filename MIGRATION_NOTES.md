# Migration Notes — Cheggie Lifestyle Finance

## Frontend
- Replace legacy `Hero` with `HeroFull` (cinematic Cypress beach skyline) and add `MediaCards` section consuming Pexels placeholders.
- Introduced lazy-loaded sections to trim initial bundle (`DashboardShowcase`, `Pricing`, `TestimonialsSection`, `FAQSection`).
- New UI primitives: `ThemeToggle`, `FeatureCard`, hero folder.
- `/public/logs/agent-loop.jsonl` provides seeded log stream for admin console.

## Admin Console
- Added React Router subtree under `/admin/*` with Suspense-driven dynamic imports.
- `AdminAuthProvider` wraps app; credentials validated via Flowise webhook or local fallback.
- Tabs: Assistant, Computer-Use, Agents, Reviews, Logs. Each implements spec’d controls.

## Agentic System
- `src/agentic` directory houses orchestrator, loop runners, adapters, schemas.
- Vendors for Always-On assistant and Big-3 Gemini stored in `/packages/always-on` and `/packages/big3`.
- Cron runner (`schedule.cron.ts`) and webhook handler (`webhook.ts`) prepared for Lovable Cloud deployment.

## Dependencies
- Added `react-diff-viewer-continued`, `react-json-view-lite`, and `node-cron` to `package.json`.
- Update lockfile (`npm install`) before deployment.

## Env / Secrets
- New template `ENV_TEMPLATE.example` enumerates Lovable, Flowise, Gemini, Unsplash, and Pexels keys plus admin allow list.
- Theme preference stored in `cheggie-theme-preference` localStorage.

## QA Follow-up
- Connect Flowise flows (`design-audit-flow`) with actual Flow IDs.
- Wire Big-3 agent outputs to Lovable Cloud storage + Admin UI screenshot gallery.
- Replace mock PR/log data with real Lovable Cloud API integrations.
