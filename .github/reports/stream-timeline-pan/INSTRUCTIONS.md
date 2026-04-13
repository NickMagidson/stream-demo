# Instructions: verify stream-timeline-pan

1. Start MediaMTX and publish to path `mystream` (or use your existing compose stack).
2. From `frontend/mediamtx-test-frontend`, run `npm run dev` and open the home page (same hostname you use for HLS, port **8888** reachable).
3. Confirm video plays (muted autoplay), **Pause/Play** toggles playback.
4. When the buffer reports a seekable range, the **timeline** appears (not the “Buffer not ready” placeholder).
5. **Scroll horizontally** on the timeline: tick labels pan; playback time does not change from scroll alone.
6. **Click** on the track: playback jumps to the clicked time within the seekable window; **rose playhead** moves accordingly.
7. Optional: focus the track and use **ArrowLeft** / **ArrowRight** to step by one tick interval (15s).

Lint: `cd frontend/mediamtx-test-frontend && npm run lint`.
