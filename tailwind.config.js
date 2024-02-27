/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-orange": {
          base: "#BF7F1E",
          light: "#FFBF18",
        },
      },
    },
  },
  plugins: [],
};
