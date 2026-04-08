# Skill: Infrastructure — Docker & MediaMTX

## Purpose

Adjust **Docker Compose**, **MediaMTX** ports/environment, and **`.env.example`** without breaking HLS/WebRTC expectations.

## When to use

- `docker-compose.yml`
- `.env`, `.env.example`
- Comments or docs that describe ports and LAN behavior

## When not to use

- Next.js UI code (use **`SKILL-FRONTEND-NEXT`**).

## Procedure

1. **Ports** (defaults in compose): RTSP **8554**, RTMP **1935**, HLS **8888**, WebRTC **8889**, SRT **8890/udp**, WebRTC ICE **8189/udp**, frontend **3000**.
2. **`LAN_IP`**: Used for WebRTC/ICE (`MTX_WEBRTCADDITIONALHOSTS`). Document in `.env.example` when changing behavior.
3. **Frontend service**: Built from `./frontend/mediamtx-test-frontend`; depends on `mediamtx`.
4. After compose edits, run `docker compose config` to validate YAML.

## Validation

- `docker compose config` for compose changes.
- If you change runtime env, update **`docs/ARCHITECTURE.md`** or **`docs/DECISIONS.md`** and the task report.

## Related docs

- **`docs/ARCHITECTURE.md`**
- **`docs/DECISIONS.md`**
