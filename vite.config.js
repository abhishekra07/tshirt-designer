import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@rollup/rollup-linux-x64-gnu"], // Add the problematic module as an external dependency
    },
  },
});
