# Agent Integrations — Cheggie Lifestyle Finance

## Flowise
- `src/services/flowwise.ts` exposes `runFlow` and `validateAdminCredentials`.
- Agent loops call `runFlow('design-audit-flow', { task })`; replace with real Flow IDs.
- Requires `VITE_FLOWWISE_URL` and `VITE_FLOWWISE_KEY` in environment.

## Always-On Assistant
- Vendored package: `packages/always-on`.
- Admin Assistant tab toggles generator via `startListener({ queue })`, `ack`, and `fail`.
- Replace generator with real queue consumer once connected to repository.

## Big-3 Computer-Use Gemini
- Vendored package: `packages/big3`.
- `/admin/computer-use` sends `{ url, goal, maxSteps, filters }` to `runComputerUse`.
- Persist `trace`, `screenshots`, and `artifacts` to Lovable Cloud storage for production use.

## Orchestrator
- `src/agentic/orchestrator.ts` coordinates loop definitions, manual runs, and future cron scheduling.
- Cron runner (`runners/schedule.cron.ts`) uses dynamic `node-cron` import for server-side execution.
- Webhook handler (`runners/webhook.ts`) accepts `run-now` and `status` actions for Flowise callbacks.

## Logs & Reviews
- `public/logs/agent-loop.jsonl` seeded with sample entries; replace with Flowise output.
- Reviews tab uses mock PR data until Lovable Cloud PR API integration is wired.
