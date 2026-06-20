/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        luxury: ['"Playfair Display"', 'serif'],
        modern: ['"Inter"', 'sans-serif'],
      },
      colors: {
        luxe: {
          black: "#0B0B0F",
          gold: "#D4AF37",
          softWhite: "rgba(255,255,255,0.8)",
        }
      },
      boxShadow: {
        goldGlow: "0 0 25px rgba(212,175,55,0.3)",
      },
      letterSpacing: {
        widestPlus: "0.2em",
      }
    },
  },
  plugins: [],
}
