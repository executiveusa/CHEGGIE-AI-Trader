import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Support Railway environment and dev environment
const flowise_url = process.env.VITE_FLOWWISE_URL || "http://localhost:3000";

const proxyFlowise = {
  target: flowise_url,
  changeOrigin: true,
  secure: false,
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: parseInt(process.env.PORT || "8080"),
    proxy: {
      "/agents": proxyFlowise,
      "/api/v1": proxyFlowise,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@packages": path.resolve(__dirname, "./packages"),
    },
  },
  optimizeDeps: {
    exclude: ["node-cron"],
  },
  build: {
    rollupOptions: {
      external: ["node-cron"],
    },
  },
  ssr: {
    external: ["node-cron"],
  },
}));
