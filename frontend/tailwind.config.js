/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#3B82F6",
        "primary-hover": "#2563EB",
        "background-dark": "#111827",
        "background-light": "#F9FAFB",
        "card-dark": "#1F2937",
        "card-light": "#FFFFFF",
        "text-dark-primary": "#F9FAFB",
        "text-dark-secondary": "#D1D5DB",
        "text-light-primary": "#1F2937",
        "text-light-secondary": "#4B5563",
        "border-dark": "#374151",
        "border-light": "#E5E7EB",

        needs: "#4A90E2",
        wants: "#F59E0B",
        savings: "#10B981",
        income: "#8B5CF6",
      },
    },
  },
  plugins: [],
};
