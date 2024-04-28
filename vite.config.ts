import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // https://github.com/laravel/vite-plugin/issues/28
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
        },
    },
});
