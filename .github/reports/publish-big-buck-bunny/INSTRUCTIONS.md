# How to verify

1. From repo root: `docker compose up --build`
2. In another terminal: `./scripts/publish-big-buck-bunny.sh`
3. Open `http://localhost:3000` — HLS should show Big Buck Bunny (may take a short time on first connect while ffmpeg probes the remote file).

Optional: `SOURCE_URL` and `RTSP_URL` env vars as documented in `README.md`.
