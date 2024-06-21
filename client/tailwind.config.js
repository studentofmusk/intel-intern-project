/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "my-primary":"#0881A3",
        "my-secondary":"#FFFDFB",
        "pale-pink":"#FDE9DF",
        "my-orange":"#FFD6A4",
        "my-text":"#4C5658",
        "my-text2":"#3A4D52",
        "my-violet":"#5A639C",
        "my-red":"#BE4B27",
        "my-brown":"#987070",
      }
    },
  },
  plugins: [],
}