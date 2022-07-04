import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/ai-tic-tac-toe/",
  build: {
    outDir: "../docs",
  },
});
