/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FBF7F0', 100: '#F5EEE0', 200: '#EADFC9', 300: '#D9CAAE' },
        gold: { 200: '#ECD9B5', 300: '#E0C48F', 400: '#D4AF7A', 500: '#C09556', 600: '#A07838' },
        cocoa: { 600: '#5E4333', 700: '#4A3326', 800: '#33221A', 900: '#21150F', 950: '#150C08' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
