import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(async () => ({
	plugins: [viteSingleFile()],
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()],
		},
	},
}));

