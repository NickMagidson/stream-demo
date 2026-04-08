# Workflow

Lifecycle for a typical task (human or AI in Copilot/Cursor).

1. **Capture the user’s task** from the conversation (and any issue link they provide); see **`docs/COPILOT-OPERATING-RULES.md`** for slug, reports, and PR linking.
2. **Classify** with **`docs/TASK-CLASSIFICATION.md`**.
3. **Load skills** from **`docs/SKILLS.md`** (only those needed).
4. **Implement** following **`docs/GUARDRAILS.md`** and **`docs/STYLES.md`**.
5. **Validate** using **`docs/skills/SKILL-REPOSITORY-VALIDATION.md`**.
6. **Prepare PR** per **`docs/workflow/WORKFLOW-PRS.md`** (if you are publishing to GitHub).
7. **Task report**: update **`.github/reports/{task-slug}/`** as required by operating rules.
8. **Documentation**: if behavior or structure changed, update **`docs/ARCHITECTURE.md`**, **`docs/DECISIONS.md`**, or skills.

## Documentation review

After merging significant work, confirm docs still match the repo (ports, env, commands).
