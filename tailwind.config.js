/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : 'class',
  content: ["./src/**/*.{html,js}", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily:{
        'roboto' : ['Roboto', 'sans-serif'],
        'inter' : ['Inter', 'sans-serif'],
        'poppins' : ['Poppins', 'sans-serif'],
      },
      colors: {}
    },
  },
  plugins: []
}
