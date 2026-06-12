import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // react-force-graph-3d transitively bundles its own three — dedupe so one
  // instance is shared (fixes "Multiple instances of Three.js" warning)
  resolve: {
    dedupe: ["three"],
  },
});
