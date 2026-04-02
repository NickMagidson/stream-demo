"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

const STREAM_PATH = "/mystream/index.m3u8";

/** MediaMTX HLS (Docker): same hostname as this page, port 8888, HTTP. */
function hlsOrigin(): string {
  return `http://${window.location.hostname}:8888`;
}

export function StreamPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const base = hlsOrigin();
    const src = `${base}${STREAM_PATH}`;
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        manifestLoadingTimeOut: 15000,
        manifestLoadingMaxRetry: 4,
        levelLoadingTimeOut: 15000,
        fragLoadingTimeOut: 20000,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.error("HLS fatal error", data.type, data.details, { src });
        }
      });
      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="aspect-video w-full max-w-4xl rounded-lg bg-black object-contain"
      controls
      playsInline
      muted
      autoPlay
    />
  );
}
