/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        needs: "#4A90E2",
        wants: "#8B4513",
        savings: "#808080",
        income: "#800080",
      },
    },
  },
  plugins: [],
};
