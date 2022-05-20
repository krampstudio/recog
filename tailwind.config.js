export default {
  content: [
    "./index.html",
    "./demo/**/*.{svelte,js,ts}",
    "./lib/**/*.{svelte,js,ts}",
  ],
  theme: {
    extend: {
        maxWidth: {
            '1/2': '50%',
        }
    },
  },
  plugins: [],
}
