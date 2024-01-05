import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	plugins: [react()],
	server: {
		host: "127.0.0.1",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			plugins: [
				visualizer({
					gzipSize: true,
					brotliSize: true,
				}),
			],
		},
	},
});
