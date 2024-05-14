import path from "node:path";

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react(), visualizer()],
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env.API_URL,
          changeOrigin: false,
        },
      },
      watch: {
        usePolling: true,
      },
    },
    build: {
      sourcemap: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: "automatic",
      },
    },
    css: {
      modules: {
        generateScopedName: "[name]__[local]__[hash:base64:5]",
      },
    },
  };
});
