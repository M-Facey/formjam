/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          orange: "#F1982E",
          pink: "#FF007A",
          purple: "#7000FF",
          dark: {
            100: "#36323F",
            500: "#1D1A2E",
            800: "#05051E",
          },
          light: {
            100: "#F5F6FA",
          },
        },
      },
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
