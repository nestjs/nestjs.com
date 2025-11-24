// react-router.config.ts
import type { Config } from "@react-router/dev/config";

const config: Config = {
  // Set to false if you want only static prerender (no runtime server)
  ssr: false,

  // Which paths to prerender
  prerender: ["/"],
};

export default config;
