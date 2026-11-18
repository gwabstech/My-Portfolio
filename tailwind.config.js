/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1728px',
      },
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        obsidian: 'var(--obsidian)',
        navy: 'var(--navy)',
        'navy-2': 'var(--navy-2)',
        'navy-deep': 'var(--navy-deep)',
        teal: '#00C2A8',
        'teal-bright': '#36E0C8',
        'teal-ink': '#04241F',
        'cyber-blue': '#0256CD',
        slate: 'var(--slate)',
        surface: 'var(--surface)',
        'surface-border': 'var(--surface-border)',
        offwhite: 'var(--offwhite)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-delayed': 'floatSlow 7s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
