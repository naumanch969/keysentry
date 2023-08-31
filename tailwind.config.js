/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-dark': '#181818',
        'soft-dark': '#373737',
        'light-main-dark': '#202020',
        'text-dark': '#fff',
        'soft-text-dark': '#aaaaaa',

        'main': '#f9f9f9',
        'soft': '#f5f5f5',
        'light-main': '#fff',
        'text': '#000',
        'soft-text': '#606060',

      },
      boxShadow: {
        'box': '1px 0px 4px -1px #444444'
      }
    },
  },
  plugins: [],
}