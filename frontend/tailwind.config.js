/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line
    "./public/index.html", // Include if you have classes in your public HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}