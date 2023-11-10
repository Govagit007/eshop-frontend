/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      f: ["Montserrat", "sans-serif"],
      f1: ["Sometype Mono", "monospace"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
