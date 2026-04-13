# Report: stream-timeline-pan

## What changed

| Area | Change |
|------|--------|
| `app/LivePreview.tsx` | New client component: shared `videoRef`, `StreamPlayer`, Play/Pause, `StreamTimeline`. |
| `app/StreamTimeline.tsx` | New timeline: `video.seekable` bounds, 15s ticks, horizontal pan, click-to-seek, playhead, arrow-key nudge. |
| `app/StreamPlayer.tsx` | Accepts `videoRef` prop; removes native `controls`; Safari path clears `src` on teardown. |
| `app/page.tsx` | Renders `LivePreview` instead of `StreamPlayer` directly. |
| `docs/ARCHITECTURE.md` | Notes `LivePreview` / `StreamTimeline` under `app/`. |

## Why

Live HLS from MediaMTX benefits from a DVR-style ruler tied to `seekable` rather than a single finite `duration`. Pan-only scroll keeps labels readable while click-to-seek keeps a clear separation between navigation and playback time.

## Validation

- `npm run lint` in `frontend/mediamtx-test-frontend` passes.

## Follow-ups (out of scope)

- “Follow playhead” auto-scroll while playing.
- Drag-to-scrub on the track; wheel seek.
