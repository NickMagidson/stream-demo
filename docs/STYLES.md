# Style Conventions

## TypeScript / React

- Use **functional components** and hooks.
- Use explicit types for public props and non-obvious state; avoid `any`.
- Add `'use client'` only when required (browser APIs, event handlers that need client boundaries).

## Next.js

- Prefer **App Router** file conventions: `app/page.tsx`, `app/layout.tsx`.
- Keep server/client split clear; colocate small UI next to routes when it stays readable.

## Styling

- Use **Tailwind** utility classes consistent with existing pages.
- Avoid inline styles unless there is a strong reason.

## File and naming

- **PascalCase** for React component files (e.g. `StreamPlayer.tsx`).
- **kebab-case** or **lowercase** for config files per ecosystem defaults (`next.config.ts`, `docker-compose.yml`).

## Comments

- Comment **why** for non-obvious streaming URLs, ports, or env requirements; avoid narrating obvious code.

## Formatting

- Follow **ESLint** (`npm run lint` in the frontend package).
