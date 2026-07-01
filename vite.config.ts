import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), svgrPlugin()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
