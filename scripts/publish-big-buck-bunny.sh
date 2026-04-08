#!/usr/bin/env bash
# Streams Big Buck Bunny (Blender Foundation, CC BY 3.0) from the official CDN to MediaMTX over RTSP/TCP.
# Requires: ffmpeg on the host, and `docker compose up` running.
# Source: https://peach.blender.org/ — https://download.blender.org/peach/bigbuckbunny_movies/
# Docs: https://mediamtx.org/docs/publish/ffmpeg

set -euo pipefail
RTSP_URL="${RTSP_URL:-rtsp://127.0.0.1:8554/mystream}"
SOURCE_URL="${SOURCE_URL:-https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_h264.mov}"

exec ffmpeg -re -stream_loop -1 -i "$SOURCE_URL" \
  -c:v libx264 -pix_fmt yuv420p -preset ultrafast -tune zerolatency -b:v 1500k \
  -c:a aac -ar 48000 -ac 2 -b:a 128k \
  -f rtsp -rtsp_transport tcp "$RTSP_URL"
