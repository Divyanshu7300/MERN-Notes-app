/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ['Orbitron', 'sans-serif'],
      },
      colors: {
        baseBlack: '#000000',
        cardBlack: '#0a0a0a',
      },
    },
  },
  plugins: [],
}
