/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        "main-orange": {
          base: "#BF7F1E",
          light: "#FFBF18",
        },
        "main-white": {
          base: "#EEFAEE",
          dark: "#E6F0E6",
        },
      },
    },
  },
  plugins: [],
};
