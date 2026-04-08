# Architecture

## Overview

```
mediaMtxTest/
├── docker-compose.yml          # mediamtx + frontend services
├── .env / .env.example       # LAN_IP for WebRTC; documented defaults
└── frontend/mediamtx-test-frontend/
    └── app/                    # Next.js App Router (pages, layout, StreamPlayer)
```

## Runtime

- **MediaMTX** (`bluenviron/mediamtx:1`): ingests/publishes streams; exposes HLS on **8888**, WebRTC on **8889**, etc.
- **Frontend**: Next.js app on **3000**; browser loads HLS from **the same host** on **8888** (see **`docs/DECISIONS.md`**).

## Boundaries

| Layer | Responsibility | Typical files |
|-------|----------------|---------------|
| **Streaming server** | Protocols, paths, ICE hosts | `docker-compose.yml` (mediamtx service), env |
| **Web UI** | Playback UX, client-side HLS | `frontend/mediamtx-test-frontend/app/*` |
| **Build** | Next production image | `frontend/mediamtx-test-frontend/Dockerfile` |

## Data flow (HLS)

Browser → HTTP **3000** (Next) for the app → **hls.js** fetches playlist/segments from **8888** on the **same hostname** the user opened (localhost or LAN IP).

## Documentation for AI

- Entry: **`.github/copilot-instructions.md`**
- Task routing: **`docs/TASK-CLASSIFICATION.md`** → **`docs/SKILLS.md`**
