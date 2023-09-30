/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        "pri" : "#F1F6F9",
        "sec": "#394867",
        "ter": "#212A3E",
        "grad": "#9BA4B5",
        "dark-pri": "#27374D",
        "dark-sec": "#526D82",
        "dark-ter":"#9DB2BF",
        "dark-grad": "#DDE6ED"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}