#!/usr/bin/env bash
# Publishes a synthetic test pattern to MediaMTX over RTSP/TCP (matches MTX_RTSPTRANSPORTS=tcp).
# Requires: ffmpeg on the host, and `docker compose up` running.
# Docs: https://mediamtx.org/docs/publish/ffmpeg

set -euo pipefail
RTSP_URL="${RTSP_URL:-rtsp://127.0.0.1:8554/mystream}"

exec ffmpeg -re -f lavfi -i "testsrc=size=1280x720:rate=30" \
  -f lavfi -i "sine=frequency=440:sample_rate=48000" \
  -c:v libx264 -pix_fmt yuv420p -preset ultrafast -tune zerolatency -b:v 1500k \
  -c:a aac -ar 48000 -ac 2 -b:a 128k \
  -f rtsp -rtsp_transport tcp "$RTSP_URL"
