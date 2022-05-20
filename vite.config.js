import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import postcss from './postcss.config.js';

export default defineConfig({
    css: {
        postcss
    },
    build: {

        sourcemap: true,
        lib: {
            entry: "lib/RecogWidget.svelte",
            name: "RecogWidget"
        },
    },

    plugins: [svelte()]
});
