import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const projectDirectory = import.meta.dirname;
const outputDirectory = process.env.PROJECTS_OUT_DIR ?? "dist";

export default defineConfig({
  base: "/projects/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(projectDirectory, "client", "src"),
    },
  },
  root: resolve(projectDirectory, "client"),
  build: {
    outDir: resolve(projectDirectory, outputDirectory),
    emptyOutDir: true,
    sourcemap: false,
  },
});
