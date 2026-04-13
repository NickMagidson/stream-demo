import { LivePreview } from "./LivePreview";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            MediaMTX live preview
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Publish to path{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              mystream
            </code>{" "}
            (RTSP, RTMP, etc.). HLS is loaded from this same hostname on port{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              8888
            </code>
            — open via <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">localhost</code> or your LAN IP consistently.
          </p>
        </div>
        <LivePreview />
      </main>
    </div>
  );
}
