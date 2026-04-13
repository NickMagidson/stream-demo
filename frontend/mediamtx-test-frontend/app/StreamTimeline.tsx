"use client";

import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const PX_PER_SEC = 6;

function getSeekableRange(
  video: HTMLVideoElement,
): { start: number; end: number } | null {
  const s = video.seekable;
  if (!s || s.length === 0) return null;
  const start = s.start(0);
  const end = s.end(0);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return null;
  }
  return { start, end };
}

function formatClock(sec: number): string {
  if (!Number.isFinite(sec)) return "—";
  const whole = Math.floor(sec);
  const s = whole % 60;
  const m = Math.floor(whole / 60) % 60;
  const h = Math.floor(whole / 3600);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

type TimelineSnapshot = {
  hasVideo: boolean;
  range: { start: number; end: number } | null;
  currentTime: number;
};

function readSnapshot(
  videoRef: RefObject<HTMLVideoElement | null>,
): TimelineSnapshot {
  const v = videoRef.current;
  if (!v) return { hasVideo: false, range: null, currentTime: 0 };
  return {
    hasVideo: true,
    range: getSeekableRange(v),
    currentTime: v.currentTime,
  };
}

export type StreamTimelineProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  /** Seconds between tick labels (default 15). */
  tickStepSec?: number;
};

export function StreamTimeline({
  videoRef,
  tickStepSec = 15,
}: StreamTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [snap, setSnap] = useState<TimelineSnapshot>(() => ({
    hasVideo: false,
    range: null,
    currentTime: 0,
  }));

  const refresh = useCallback(() => {
    setSnap(readSnapshot(videoRef));
  }, [videoRef]);

  useLayoutEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const on = () => refresh();
    v.addEventListener("timeupdate", on);
    v.addEventListener("seeked", on);
    v.addEventListener("progress", on);
    v.addEventListener("loadedmetadata", on);
    v.addEventListener("durationchange", on);
    return () => {
      v.removeEventListener("timeupdate", on);
      v.removeEventListener("seeked", on);
      v.removeEventListener("progress", on);
      v.removeEventListener("loadedmetadata", on);
      v.removeEventListener("durationchange", on);
    };
  }, [videoRef, refresh]);

  const range = snap.range;
  const span = range ? range.end - range.start : 0;
  const trackWidthPx = range
    ? Math.max(120, Math.ceil(span * PX_PER_SEC))
    : 120;

  const ticks: number[] = [];
  if (range && tickStepSec > 0) {
    const step = tickStepSec;
    let t = Math.ceil(range.start / step) * step;
    while (t <= range.end + 1e-6) {
      if (t >= range.start - 1e-6) ticks.push(t);
      t += step;
    }
  }

  const clampedTime = range
    ? Math.min(range.end, Math.max(range.start, snap.currentTime))
    : 0;
  const playheadLeftPx =
    range && span > 0 ? (clampedTime - range.start) * PX_PER_SEC : 0;

  const onTrackPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const v = videoRef.current;
    const track = trackRef.current;
    const sc = scrollRef.current;
    if (!v || !track || !sc) return;
    const r = getSeekableRange(v);
    if (!r || r.end <= r.start) return;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left + sc.scrollLeft;
    const w = track.offsetWidth;
    const t = r.start + (x / w) * (r.end - r.start);
    v.currentTime = Math.min(r.end, Math.max(r.start, t));
  };

  if (!snap.hasVideo) {
    return (
      <div className="h-14 w-full min-w-0 rounded-md border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        No video element.
      </div>
    );
  }

  if (!range) {
    return (
      <div className="h-14 w-full min-w-0 rounded-md border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        Buffer not ready — seekable range unavailable.
      </div>
    );
  }

  return (
    <div className="min-w-0 flex-1 rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
      <div
        ref={scrollRef}
        className="max-w-full overflow-x-auto overscroll-x-contain"
      >
        <div
          ref={trackRef}
          role="button"
          tabIndex={0}
          aria-label="Seek in live buffer; scroll horizontally to pan time labels"
          className="relative h-14 cursor-pointer touch-pan-x"
          style={{ width: trackWidthPx }}
          onPointerDown={onTrackPointerDown}
          onKeyDown={(e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            const v = videoRef.current;
            if (!v) return;
            const r = getSeekableRange(v);
            if (!r || r.end <= r.start) return;
            const delta = (e.key === "ArrowLeft" ? -1 : 1) * tickStepSec;
            v.currentTime = Math.min(
              r.end,
              Math.max(r.start, v.currentTime + delta),
            );
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-6 border-b border-zinc-200 dark:border-zinc-700" />
          {ticks.map((t) => {
            const left = (t - range.start) * PX_PER_SEC;
            return (
              <div
                key={t}
                className="pointer-events-none absolute top-6 flex flex-col items-center"
                style={{ left, transform: "translateX(-50%)" }}
              >
                <div className="h-2 w-px bg-zinc-400 dark:bg-zinc-500" />
                <span className="mt-0.5 whitespace-nowrap text-[10px] font-medium tabular-nums text-zinc-600 dark:text-zinc-400">
                  {formatClock(t)}
                </span>
              </div>
            );
          })}
          <div
            className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-rose-500 dark:bg-rose-400"
            style={{ left: playheadLeftPx, transform: "translateX(-50%)" }}
          />
        </div>
      </div>
    </div>
  );
}
