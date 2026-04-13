"use client";

import { useEffect, useRef, useState } from "react";
import { StreamPlayer } from "./StreamPlayer";
import { StreamTimeline } from "./StreamTimeline";

export function LivePreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    sync();
    return () => {
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
    };
  }, []);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <StreamPlayer videoRef={videoRef} />
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <button
          type="button"
          className="shrink-0 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            if (v.paused) {
              void v.play();
              setPlaying(true);
            } else {
              v.pause();
              setPlaying(false);
            }
          }}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <StreamTimeline videoRef={videoRef} tickStepSec={15} />
      </div>
    </div>
  );
}
