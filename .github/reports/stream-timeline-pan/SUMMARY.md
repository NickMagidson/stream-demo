# Summary: stream-timeline-pan

Added a scroll-pan timeline for the live HLS preview: horizontal pan shows tick labels across the seekable window; click (or arrow keys) seeks. The video element ref is owned by `LivePreview` and shared with `StreamPlayer` and `StreamTimeline`. Native `<video controls>` were removed in favor of a Play/Pause control plus the timeline.
