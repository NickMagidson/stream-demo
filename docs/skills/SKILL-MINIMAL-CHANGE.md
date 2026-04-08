# Skill: Minimal Safe Change

## Purpose

Keep edits **small**, **reviewable**, and **aligned** with existing patterns so streaming behavior and deployments stay predictable.

## When to use

- Any code or config change.
- Especially when the **task** scope is narrow (one bug, one feature slice).

## When not to use as an excuse

- Do not use “minimal” to skip validation, tests required by the user, or documentation updates when behavior or env contracts change.

## Procedure

1. Restate **the user’s task** and success criteria in one sentence.
2. Locate the **single** best insertion point using **`docs/ARCHITECTURE.md`**.
3. Prefer **extending** existing functions/components over new abstractions.
4. Avoid formatting-only or unrelated file churn.
5. If you discover necessary follow-up work **outside** the task, note it in the PR/report; do not expand scope without instruction.

## Validation

- Run checks from **`docs/skills/SKILL-REPOSITORY-VALIDATION.md`** for touched areas.

## Related docs

- **`docs/GUARDRAILS.md`**
- **`docs/STYLES.md`**
