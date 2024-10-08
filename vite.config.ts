import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/ts/app.tsx"],
      buildDirectory: "motionpanel-files",
      refresh: true,
    }),
    TanStackRouterVite({
      routesDirectory: "resources/ts/routes",
      generatedRouteTree: "resources/ts/routeTree.gen.ts",
    }),
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": "/resources/ts",
    },
  },
});
