# Change proposal

## Approach

- New bash script alongside `publish-test-stream.sh`, same encoding and RTSP/TCP output defaults.
- Input: HTTPS URL to `big_buck_bunny_720p_h264.mov` on `download.blender.org` (official Peach / Big Buck Bunny distribution).
- `-re` + `-stream_loop -1` for continuous looped playback suitable for demos.

## Alternatives considered

- **Replace** the test-pattern script — rejected to keep a lightweight synthetic option without network dependency.
- **`-c:v copy -c:a copy`** — rejected for first version; remux/copy to RTSP can be brittle across inputs; re-encode matches the proven test script.
