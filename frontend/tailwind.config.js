/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Inter", 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['jetbrains mono'],
        'display': ["Quicksand"],
        'body': ["Quicksand"],
      }
    },
  },
  plugins: [],
}