# Skill: Frontend (Next.js)

## Purpose

Change the **Next.js App Router** app safely: pages, layout, client components, and HLS playback.

## When to use

- Files under `frontend/mediamtx-test-frontend/app/`
- `next.config.ts`, Tailwind/PostCSS config, frontend `Dockerfile`

## When not to use

- MediaMTX server configuration or compose service definitions (use **`SKILL-INFRA-DOCKER-MEDIAMTX`**).

## Procedure

1. **App Router**: Prefer Server Components by default; add `'use client'` only when you need browser APIs (e.g. HLS in `useEffect`).
2. **HLS URL**: Playback uses **`http://<browser-host>:8888`** (same host as the user’s browser, port **8888**). Do not require `NEXT_PUBLIC_MEDIAMTX_BASE` for basic HLS unless the user’s task explicitly adds multi-host support.
3. **Dependencies**: Use existing stack (Next 16, React 19, `hls.js`, Tailwind 4). Do not add UI frameworks without an architectural decision.
4. Match patterns in **`docs/STYLES.md`** and existing components (e.g. `app/StreamPlayer.tsx`).

## Validation

- **`docs/skills/SKILL-REPOSITORY-VALIDATION.md`**

## Related docs

- **`docs/ARCHITECTURE.md`**
- **`docs/DECISIONS.md`**
