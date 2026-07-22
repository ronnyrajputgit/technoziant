---
description: "Build, commit, and push code to git remote. Usage: push [commit message]"
---

# Git Push

Build project, stage changes, commit with message, and push to remote.

## Usage

```
push [optional commit message]
```

If no message provided, generate a descriptive one based on changed files.

## Workflow

1. Run build to verify no errors:
   ```bash
   npm run build 2>&1 | tail -5
   ```

2. If build fails, fix errors before proceeding.

3. Stage all changes and check status:
   ```bash
   git add -A && git status
   ```

4. Commit with provided or generated message:
   ```bash
   git commit -m "<message>"
   ```

5. Push to remote:
   ```bash
   git push
   ```

## Commit message style

- Use imperative mood: "fix hero header spacing", "add team photo upload"
- Keep under 72 characters
- Reference component/page name when relevant

## Stopping condition

Push succeeds. If build fails, stop and report error without committing.
