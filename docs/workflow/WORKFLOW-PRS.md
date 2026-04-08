# Pull Request Workflow

Use this when work leaves the Copilot/Cursor session and becomes a GitHub PR. If the user is only iterating locally, validation steps still apply; PR sections are optional until they push.

## Branch names

- `copilot/{task-slug}` or `copilot/{task-slug}.{iteration}` (see **`docs/COPILOT-OPERATING-RULES.md`** for choosing `task-slug`).

## Commits

- Imperative, focused messages; put context or a GitHub issue reference (`#123`) in the body when relevant.
- Keep commits scoped; avoid mixing unrelated concerns.

## PR description

- Summarize **what** changed and **why** (short).
- If the user provided a **GitHub issue**, link it and use `Closes #123` / `Fixes #123` when the PR fully resolves it.
- List **validation** run (e.g. `npm run lint`, `npm run build`, `docker compose config`).

## Evidence

- For frontend changes: note **lint** and **build** results.
- For compose/env changes: note **config validation** or manual test steps.

## Draft PRs

- AI-opened PRs stay **draft** until a human hands off for review (see **`docs/COPILOT-OPERATING-RULES.md`**).

## Documentation

- If the PR changes how to run or access streams, update **`docs/ARCHITECTURE.md`**, **`.env.example`**, or **`docs/DECISIONS.md`** in the same PR when reasonable.
