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
          light: "#E8D4A4",
          vibrant: "#FFBF18",
        },
        "main-white": {
          base: "#EEFAEE",
          dark: "#E6F0E6",
        },
      },
      dropShadow: {
        "main-base": "0px 6px 7px rgba(0, 0, 0, 0.3)",
        "main-darker": "0px 6px 9px rgba(0, 0, 0, 0.45)",
        top: "0px -1px 5px rgba(0, 0, 0, 0.25)",
      },
      transitionTimingFunction: {
        "bounce-end": "cubic-bezier(.16,.66,.42,1.3)",
      },
    },
  },
  plugins: [],
};
