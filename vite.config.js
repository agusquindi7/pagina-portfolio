import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/pagina-portfolio/", // Cambia esto al nombre de tu repositorio
  plugins: [react()],
});
