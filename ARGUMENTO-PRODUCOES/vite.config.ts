import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  build: {
    target: "es2020",
    // Gzip threshold — inline assets smaller than 4kb
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split vendor code for better caching
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["motion"],
        },
      },
    },
  },

  server: {
    proxy: {
      "/login": "http://10.100.20.8:8000",
      "/api": "http://10.100.20.8:8000",
    },
  },

  // Vitest config
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: ["node_modules/", "src/tests/"],
    },
  },
});
