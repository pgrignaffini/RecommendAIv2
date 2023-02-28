/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};

module.exports = config;
