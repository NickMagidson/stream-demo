# Agent Instructions

This file exists as a compatibility fallback for tools that support `AGENTS.md`.

Primary repository instructions are still defined in:

- `.github/copilot-instructions.md`
- `docs/COPILOT-OPERATING-RULES.md`

## Required Order

1. Understand the **user’s task** from the current Copilot/Cursor conversation (and any link or issue number they provide).
2. Read `.github/copilot-instructions.md`.
3. Read `docs/COPILOT-OPERATING-RULES.md`.
4. Classify with `docs/TASK-CLASSIFICATION.md`.
5. Load only required skills from `docs/SKILLS.md`.
6. Follow `docs/GUARDRAILS.md`.
7. Follow `docs/WORKFLOW.md` and `docs/workflow/WORKFLOW-PRS.md` for validation and PR lifecycle.

## Delivery Rules

- **Task slug:** Choose a short **kebab-case** name for the work (e.g. `fix-hls-reconnect`, or `issue-42` if the user gave a GitHub issue number). Use the same slug for the report folder and branch when you open a PR.
- **Branches:** `copilot/{task-slug}` or `copilot/{task-slug}.{iteration}` (e.g. `copilot/fix-hls-reconnect` or `copilot/fix-hls-reconnect.2`).
- **Commits:** Clear imperative subject; mention the slug or `#issue` in the body if the user linked a GitHub issue.
- **PRs:** Summarize what changed and why; link a GitHub issue only if the user supplied one (`Closes #123` / `Fixes #123` when appropriate).
- Initialize and maintain the report bundle at **`.github/reports/{task-slug}/`**:
  - `REPORT.md`
  - `SUMMARY.md`
  - `CHANGE_PROPOSAL.md`
  - `INSTRUCTIONS.md`
- Keep Copilot-created PRs in draft until human handoff.
