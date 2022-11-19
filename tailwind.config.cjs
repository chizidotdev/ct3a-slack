/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f2f5ff",
        secondary: "#34344a",
        accent: "#141415",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
