/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'second-font': "'Poppins', sans-serif"
      }
    },
  },
  plugins: [],
}