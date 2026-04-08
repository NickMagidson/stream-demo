# mediaMtxTest

Small stack for trying **[MediaMTX](https://github.com/bluenviron/mediamtx)** with a **Next.js** UI that plays HLS. MediaMTX is in Docker; the app expects HLS on **port 8888** on the same host name you use in the browser.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose v2
- Optional: [ffmpeg](https://ffmpeg.org/) on your machine to publish a synthetic test stream (see below)

## Run everything with Docker (simplest)

From the repository root:

```bash
cp .env.example .env
# Edit .env if you need WebRTC or access from other devices on your LAN (see below).

docker compose up --build
```

Then:

1. Open **http://localhost:3000** for the Next.js app.
2. Publish a stream to path **`mystream`** (for example with the script in the next section). Until something is publishing, the player will have nothing to play.

### WebRTC and other devices on your LAN

For **WebRTC** (and ICE), set `LAN_IP` in `.env` to this computer’s LAN address (on macOS you can use `ipconfig getifaddr en0`). The default in Compose is `127.0.0.1`, which is enough for HLS on the same machine.

- WebRTC test page (MediaMTX): `http://YOUR_LAN_IP:8889/mystream` (use the same address as in `LAN_IP` in `.env`).
- To use the frontend from a phone or another PC, open `http://YOUR_LAN_IP:3000`. HLS is loaded from port **8888** on that same host automatically (same hostname as the page).

### Ports (defaults)

| Port | Service |
|------|---------|
| 3000 | Next.js frontend |
| 8554 | RTSP |
| 1935 | RTMP |
| 8888 | HLS |
| 8889 | WebRTC (HTTP + page) |
| 8890/udp | SRT |
| 8189/udp | WebRTC ICE |

## Publish a test stream (ffmpeg)

With `docker compose` running, from the repo root:

```bash
chmod +x scripts/publish-test-stream.sh
./scripts/publish-test-stream.sh
```

This sends a test pattern to **rtsp://127.0.0.1:8554/mystream** (RTSP/TCP, matching the Compose env). Reload **http://localhost:3000** if the player was already open.

Override the URL if needed:

```bash
RTSP_URL=rtsp://127.0.0.1:8554/mystream ./scripts/publish-test-stream.sh
```

## Run only MediaMTX in Docker + Next.js locally (for UI development)

1. Start MediaMTX:

   ```bash
   docker compose up mediamtx
   ```

2. In another terminal, install and run the frontend:

   ```bash
   cd frontend/mediamtx-test-frontend
   npm ci
   npm run dev
   ```

3. Open **http://localhost:3000** and publish a stream as above. HLS still uses **localhost:8888** when you use localhost for the app.

## Project layout

- **`docker-compose.yml`** — `mediamtx` + `frontend` services
- **`frontend/mediamtx-test-frontend/`** — Next.js App Router app (HLS via [hls.js](https://github.com/video-dev/hls.js/))
- **`docs/ARCHITECTURE.md`** — More detail on how pieces fit together

## Troubleshooting

- **Black video / errors in the console** — Nothing is publishing to `mystream`, or ffmpeg/encoder failed. Run `./scripts/publish-test-stream.sh` and check MediaMTX logs: `docker compose logs -f mediamtx`.
- **Works on localhost but not from another device** — Open the app as `http://YOUR_LAN_IP:3000` (not `127.0.0.1` on the other device) and set `LAN_IP` in `.env` for WebRTC; ensure your firewall allows the ports above.
