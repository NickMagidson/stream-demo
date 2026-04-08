# Copilot Operating Rules

These rules apply to AI-assisted work in this repository in addition to **`docs/WORKFLOW.md`** and **`docs/workflow/WORKFLOW-PRS.md`**.

## Read order (mandatory)

1. **The user’s task** in this Copilot/Cursor session (full thread context, constraints, and explicit “do not” items).
2. **`.github/copilot-instructions.md`**
3. This file
4. **`docs/TASK-CLASSIFICATION.md`** → **`docs/SKILLS.md`** (load only needed skills)
5. **`docs/GUARDRAILS.md`**

If the user references an external tracker (e.g. a GitHub issue URL or number), treat that as extra scope detail—not a substitute for what they asked in chat.

## Task slug (for branches, reports, and PRs)

- Pick a **short kebab-case** slug that names the work, e.g. `docker-compose-ports`, `stream-player-a11y`.
- If they give a GitHub issue number, you may use `issue-123` as the slug for consistency.
- Use **one** slug per coherent task; bump with `.2`, `.3` on the branch name only if you need a follow-up branch for the same topic (see **`docs/workflow/WORKFLOW-PRS.md`**).

## Branches and commits

- Branch: `copilot/{task-slug}` or `copilot/{task-slug}.{iteration}`
- Commit: imperative mood (`Add retry to HLS loader`); add `#123` or the slug in the body when it helps history.

## Task report bundle

For each task, maintain **`.github/reports/{task-slug}/`** with:

- `REPORT.md` — what changed and why
- `SUMMARY.md` — short executive summary
- `CHANGE_PROPOSAL.md` — proposed approach / alternatives
- `INSTRUCTIONS.md` — how to verify or continue the work

Skip the bundle only for trivial one-line doc nits if the user did not ask for traceability; otherwise prefer creating it.

## Pull requests

- Keep Copilot-opened PRs in **draft** until a human marks them ready for review.

## Living documentation

If a change introduces a new convention, env var, port, or workflow step, update **`docs/ARCHITECTURE.md`**, **`docs/DECISIONS.md`**, or the relevant skill so the next session stays aligned.
