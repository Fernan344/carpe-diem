/** @type {import('tailwindcss').Config} */
module.exports = {
theme: {
    extend: {
      screens: {
        'max400': {'max': '399px'}, // aplica si el ancho es menor o igual a 399px
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [],
}