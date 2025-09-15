/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gowun': ['Gowun Dodum', 'sans-serif'],
        'jua': ['Jua', 'sans-serif'],
        'gamja': ['Gamja Flower', 'sans-serif'],
      },
      keyframes: {
        'mascot-wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'mascot-wiggle': 'mascot-wiggle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}