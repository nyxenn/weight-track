import { withSentryConfig } from "@sentry/nextjs";

await import("./src/env.js");

const baseConfig = {};

const config = withSentryConfig(baseConfig, {
  silent: true,
  org: "nx-l7",
  project: "weight-track",
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});

export default config;
