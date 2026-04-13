"use client";

import Hls from "hls.js";
import { type RefObject, useEffect } from "react";

const STREAM_PATH = "/mystream/index.m3u8";

/** MediaMTX HLS (Docker): same hostname as this page, port 8888, HTTP. */
function hlsOrigin(): string {
  return `http://${window.location.hostname}:8888`;
}

export type StreamPlayerProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
};

export function StreamPlayer({ videoRef }: StreamPlayerProps) {
  useEffect(() => {
    const base = hlsOrigin();
    const src = `${base}${STREAM_PATH}`;
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        // Default off: enable only for LL-HLS manifests (#EXT-X-PART); otherwise playlist polling is busier than needed.
        lowLatencyMode: false,
        // Live playlists: finite duration + moving window confuses native seek UI; Infinity + seekable range matches Safari / demos.
        liveDurationInfinity: true,
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
    return () => {
      video.removeAttribute("src");
      video.load();
    };
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      className="aspect-video w-full rounded-lg bg-black object-contain"
      playsInline
      muted
      autoPlay
    />
  );
}
