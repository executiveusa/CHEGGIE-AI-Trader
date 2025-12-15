---
description: Run the Cheggie AI Trader development server
---

# Run Dev Server Workflow

## Steps

// turbo-all

1. Navigate to project directory:

```bash
cd "E:\DESKTOP BACKUP FILES\Cheggie AI\CHEGGIE-AI-Trader"
```

2. Start the development server:

```bash
npx vite --host
```

3. Open browser to http://localhost:8080

## Notes

- The site runs on port 8080 by default
- Use `--host` flag to expose on network
- Server auto-reloads on file changes

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion for animations
- react-i18next for i18n
- TanStack Query for data fetching
- Supabase for backend
