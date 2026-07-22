---
name: build-deploy
description: "Build verification and Vercel deployment pipeline. Runs build, checks for errors, and deploys to production."
---

# Build & Deploy

Automated build verification + Vercel deployment pipeline.

## When to use

- User says "deploy", "push to production", "deploy kr de", "build and deploy"
- After making code changes that need to go live
- When verifying a build before deployment

## Workflow

### Step 1: Build Verification

```bash
# For Vite projects (active-theory-clone, datatransformui)
npx vite build 2>&1 | tail -10

# For Create React App projects (streaming-app)
CI=true npx react-scripts build 2>&1 | tail -10
```

Check output for:
- `✓ built in` — success
- `Error` or `error` — failure, fix before proceeding

### Step 2: Fix Build Errors (if any)

Common patterns:
- JSX parsing errors → check adjacent elements, missing imports
- Unused variables → remove or use them
- Missing dependencies → check import statements
- TypeScript errors → fix type issues

### Step 3: Deploy to Vercel

```bash
# From project root (vercel.json must exist)
vercel --prod --yes 2>&1 | tail -5
```

### Step 4: Verify Deployment

```bash
# Check production URL responds
curl -s -o /dev/null -w "Production: %{http_code}\n" https://<vercel-app-url>
```

## Project-specific notes

- **active-theory-clone**: Vite + React, deploy to Vercel, `vercel.json` rewrites API to serverless
- **datatransformui**: Vite + React + FastAPI backend, frontend on Vercel, backend on separate server
- **streaming-app**: Create React App, uses `CI=true` for build

## Stopping condition

Deployment URL returns 200 or 302. If build fails, stop and report error.
