import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relativa: sirve igual en la raíz de ilygomzzz.github.io que en una subruta
export default defineConfig({ base: "./", plugins: [react()] });
