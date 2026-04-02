import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Keep tracing rooted at this app so `standalone/` contains `server.js` at top level (Docker).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
