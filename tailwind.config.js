/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#6366f1',
        'secondary': '#8b5cf6',
        'bg-dark': '#0f0f12',
        'bg-card': 'rgba(30, 30, 35, 0.6)',
        'text-gray': '#a1a1aa',
      }
    },
  },
  plugins: [],
}
