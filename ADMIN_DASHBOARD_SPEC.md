# Admin Dashboard Spec — Cheggie Lifestyle Finance

## Routes
- `/admin`: Lovable Cloud login card with Flowise webhook validation.
- `/admin/assistant`: Always-On assistant control plane (start/stop listener, job queue, escalation button).
- `/admin/computer-use`: Big-3 Gemini Computer-Use launcher with guardrail toggles, trace viewer, artifact gallery.
- `/admin/agents`: Agentic loop orchestrator status, config viewer, secret inventory.
- `/admin/reviews`: Operator approval center with diff viewer, Lighthouse/UDCE metrics, merge controls.
- `/admin/logs`: JSONL log tail with search + loop filters.

## Components
- shadcn/ui primitives: Tabs, Card, Badge, ScrollArea, Button, Switch, Select, Alert, Avatar.
- Third-party: `react-json-view-lite` for config preview, `react-diff-viewer-continued` for PR diffs.

## Auth
- Wrapped by `AdminAuthProvider`; login uses `validateAdminCredentials` from Flowise service or fallback.
- Admin allow list from `ADMIN_ALLOWED_EMAILS` env variable.

## Agentic Loop Integration
- `AgentOrchestrator` manages loop metadata, manual runs, and future cron scheduling.
- Logs streamed to `/public/logs/agent-loop.jsonl` (seeded) and displayed in Logs tab.
- Reviews tab displays mock PR data until Lovable Cloud PR API is connected.

## UX Notes
- Sticky top bar with Theme toggle, Lovable auth badge, and sign-out button.
- Responsive layout (cards stack on mobile, Tabs scroll horizontally).
- Copy emphasizes Finance + Lifestyle narrative, aligning with hero messaging.
