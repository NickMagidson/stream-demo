# Task report: publish-big-buck-bunny

## What changed

- **`scripts/publish-big-buck-bunny.sh`** — ffmpeg pulls the official Big Buck Bunny 720p H.264 MOV from Blender’s CDN, re-encodes to H.264/AAC, publishes to `rtsp://127.0.0.1:8554/mystream` with TCP transport (aligned with `MTX_RTSPTRANSPORTS` in Compose).
- **`README.md`** — new section for running the script; troubleshooting mentions it.

## Why

Users wanted a **real video** source with the **simplest** implementation: one script, no new Docker services or frontend changes, same `mystream` path the UI already uses.

## License note

Big Buck Bunny is © Blender Foundation, **CC BY 3.0**; the script only references their public download URL documented at [peach.blender.org](https://peach.blender.org/).
