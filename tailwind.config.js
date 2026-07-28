/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#111827',
          900: '#0f172a',
          950: '#070c14',
        },
        cyan: {
          450: '#18b6f6',
        },
        brand: {
          dark: '#0a0e17',
          card: '#111823',
          border: '#1e293b',
          accent: '#38bdf8',
          teal: '#2dd4bf',
          amber: '#fbbf24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
