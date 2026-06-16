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
        navy: '#0A1F44',
        'navy-2': '#0D2A5C',
        'navy-deep': '#06122B',
        teal: '#00C2A8',
        'teal-ink': '#04241F',
        slate: '#B7C4DA',
        surface: '#13203A',
        'surface-border': '#223457',
        offwhite: '#F4F7FB',
      },
    },
  },
  plugins: [],
}
