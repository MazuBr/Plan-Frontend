/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.ts"],
    exclude: ["dict/**"],
  },
  plugins: [
    vue(),
  ],
  server: {
    
    https: {
      key: "./cert/key.pem",
      cert: "./cert/cert.pem",
      
    },
    host: "0.0.0.0",
    port: 443
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
});
