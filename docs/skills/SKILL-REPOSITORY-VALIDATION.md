# Skill: Repository Validation

## Purpose

Verify changes locally with the same commands maintainers expect, before opening or updating a PR.

## When to use

- After substantive edits to the Next.js app or its dependencies.
- After changing `package.json` or ESLint config.

## When not to use

- Documentation-only changes under `docs/` with no build impact (optional: run lint if you touched TS/JS examples embedded in docs).

## Procedure

From the repository root:

### Frontend (`frontend/mediamtx-test-frontend`)

```bash
cd frontend/mediamtx-test-frontend && npm ci && npm run lint && npm run build
```

Use `npm install` instead of `npm ci` only if `package-lock.json` is absent (this repo should keep a lockfile).

### Docker stack (optional, when compose or runtime behavior changed)

```bash
docker compose config
```

Full end-to-end streaming tests need a publisher and network; document what you ran in the task report if the user’s task required it.

## Validation requirements

- **Lint** and **build** must pass for frontend changes.
- Note any skipped steps (e.g. no local Docker) in **`.github/reports/{task-slug}/REPORT.md`** (see **`docs/COPILOT-OPERATING-RULES.md`** for `task-slug`).

## Related docs

- **`docs/ARCHITECTURE.md`**
- **`docs/workflow/WORKFLOW-PRS.md`**
