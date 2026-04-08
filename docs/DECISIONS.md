# Design Decisions

Intentional choices — do not “fix” these without an explicit task or decision update.

## Stack

- **MediaMTX** via official Docker image for RTSP/RTMP/HLS/WebRTC/SRT in development and demos.
- **Next.js** (App Router) + **React** + **TypeScript** for the test frontend.
- **Tailwind CSS v4** for styling.
- **hls.js** for HLS playback in the browser.

## HLS base URL

- The frontend is designed so HLS is loaded from **`http://<same-host-as-page>:8888`** without baking a separate public env var into the client for the default case (see comments in `docker-compose.yml`). Changing this is an architectural change.

## WebRTC and LAN

- **`LAN_IP`** in `.env` drives `MTX_WEBRTCADDITIONALHOSTS` so other devices on the LAN can use the WebRTC test page (**8889**). Document changes in `.env.example`.

## Copilot documentation

- Layered docs (instructions → classification → skills → guardrails) reduce context load; see the implementation guide used to bootstrap this repo.
