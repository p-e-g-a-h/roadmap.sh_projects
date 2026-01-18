import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/roadmap.sh_projects/Frontend%20Projects/Quiz%20App",
  plugins: [react(), tailwindcss()],
});
