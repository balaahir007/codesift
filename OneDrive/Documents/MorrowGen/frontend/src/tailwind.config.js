/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original Blue–Teal Theme
        primary: {
          DEFAULT: '#0097B2',
          100: '#E0F2F5',
          200: '#B3E0E9',
        },
        secondary: {
          DEFAULT: '#00B2A9',
        },
        teratery: {
          DEFAULT: '#F2F2F2',
        },
        skeleton: {
          DEFAULT: '#D9D9D9',
        },
        // Alternative Green–Teal Theme
        greenTheme: {
          primary: '#198754',
          secondary: '#20C997',
          background: '#F8F9FA',
          skeleton: '#E9ECEF',
          100: '#D1E9DA',
          200: '#A3D3B8',
        },
      },
    },
  },
  plugins: [],
}
