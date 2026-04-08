# Guardrails

Hard safety rules for AI and human contributors.

## Scope

- Implement the **smallest change** that satisfies **the user’s task** in this session.
- **No** unrelated refactors, renames, or “cleanup” in files you were not asked to touch.
- **No** new dependencies unless the task requires them or you document the need in the PR and task report.

## Architecture

- **Do not** merge frontend and MediaMTX configuration into one layer; respect boundaries in **`docs/ARCHITECTURE.md`**.
- **Do not** change streaming ports or env contracts without updating **`.env.example`** and relevant docs.

## Quality

- Preserve existing **naming**, **file layout**, and **import style**.
- Prefer **explicit** configuration over magic when touching Docker or URLs.

## Secrets

- Never commit real **LAN IPs**, passwords, or keys. Use placeholders in examples.

## When instructions conflict

- **The user’s explicit instructions in this Copilot session** and **`docs/COPILOT-OPERATING-RULES.md`** take precedence over generic suggestions.
- If still ambiguous, stop and describe options in **`CHANGE_PROPOSAL.md`** rather than guessing.
