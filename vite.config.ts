import { sveltekit } from '@sveltejs/kit/vite';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import { nested_inlang } from './vite-plugins/inlang.js';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/paraglide'
		}),
		AutoImport({
			include: [/\.[tj]s$/, /\.svelte$/],
			imports: {
				$msgs: [['*', 'm']]
			}
		}),
		nested_inlang()
	]
});
