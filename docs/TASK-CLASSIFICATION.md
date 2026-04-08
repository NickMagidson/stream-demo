# Task Classification

Use this table to decide **which skills to load** from **`docs/SKILLS.md`**. Load only what applies; do not read every skill by default.

| Category | When it applies | Primary skills |
|----------|-----------------|----------------|
| **Frontend / UI** | Next.js app, React components, HLS player UX, styling | `SKILL-FRONTEND-NEXT`, `SKILL-MINIMAL-CHANGE`, `SKILL-REPOSITORY-VALIDATION` |
| **Infrastructure / Docker** | `docker-compose.yml`, MediaMTX env, ports, container wiring | `SKILL-INFRA-DOCKER-MEDIAMTX`, `SKILL-MINIMAL-CHANGE`, `SKILL-REPOSITORY-VALIDATION` |
| **Configuration / env** | `.env`, `.env.example`, LAN/WebRTC host docs | `SKILL-INFRA-DOCKER-MEDIAMTX`, `SKILL-MINIMAL-CHANGE` |
| **Documentation only** | Copilot docs, README, runbooks (no code) | `SKILL-MINIMAL-CHANGE` |
| **Repository tooling** | ESLint, Next config, package scripts, CI files | `SKILL-REPOSITORY-VALIDATION`, `SKILL-FRONTEND-NEXT` (if Next-specific) |
| **Bugfix (unclear layer)** | Start with **`docs/ARCHITECTURE.md`** to locate the right package/service, then classify again | `SKILL-MINIMAL-CHANGE`, `SKILL-REPOSITORY-VALIDATION` |

## Not sure?

1. Re-read the **user’s task** in Copilot; list touched areas (frontend vs compose vs both).
2. Open **`docs/ARCHITECTURE.md`** for boundaries.
3. Default to **minimal change** + **validation** skills.
