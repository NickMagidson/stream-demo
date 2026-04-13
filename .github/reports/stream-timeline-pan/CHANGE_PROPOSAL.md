# Change proposal: stream-timeline-pan

## Approach

- Introduce **`LivePreview`** as a client wrapper that holds `videoRef`, renders **`StreamPlayer`** (HLS attach unchanged) and **`StreamTimeline`**, plus a minimal **Play/Pause** button because native controls were disabled to avoid duplicate scrubbers.
- **`StreamTimeline`** mirrors `seekable` range and `currentTime` into React state via `useLayoutEffect` and media event listeners, satisfying `react-hooks/refs` (no `ref.current` reads during render).
- Timeline track width scales with seekable duration at 6 px/s; ticks every 15s; playhead clamped to seekable bounds; click-to-seek uses track geometry plus scroll offset.

## Alternatives not taken

- **Native controls retained**: simpler but duplicates seek UX with the new timeline.
- **`useSyncExternalStore`**: viable for ref-driven UI; snapshot + listeners is sufficient here.
