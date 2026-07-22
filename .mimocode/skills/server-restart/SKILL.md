---
name: server-restart
description: "Kill and restart dev servers or backend processes. Handles Vite dev server, Node.js backend, and Python backend."
---

# Server Restart

Kill existing server process, start fresh, verify health.

## When to use

- User says "server restart", "server on kr", "dev server start", "server chalu kr"
- After server code changes that need hot-reload (Node.js servers have NO hot-reload)
- When server is unresponsive or serving stale code

## Workflows

### Vite Dev Server (port 3000)

```bash
pkill -f "vite" 2>/dev/null
sleep 1
cd <project-dir> && nohup npx vite --host --port 3000 > /tmp/vite.log 2>&1 &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

### Node.js Backend (port 3001)

```bash
lsof -ti:3001 | xargs kill -9 2>/dev/null
sleep 1
cd <project-dir> && nohup node server/index.cjs > /tmp/server.log 2>&1 &
sleep 4
curl -s --max-time 3 http://localhost:3001/api/health
```

### Python Backend (port 8000)

```bash
kill $(lsof -t -i :8000) 2>/dev/null
sleep 1
cd <project-dir> && nohup python3 -m uvicorn datatransformbackend.app.main:app --host 0.0.0.0 --port 8000 > /tmp/backend.log 2>&1 &
sleep 3
curl -s -o /dev/null -w "Backend: %{http_code}\n" http://127.0.0.1:8000/docs
```

## Critical notes

- **Node.js servers have NO hot-reload** — must kill and restart after ANY code change to `server/index.cjs` or route files
- Stale process serving old code is a common source of "404" or "Failed to load" errors
- Always verify with curl after restart

## Stopping condition

Health endpoint returns 200. If not, check `/tmp/*.log` for errors.
