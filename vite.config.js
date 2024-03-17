import million from "million/compiler";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({auto: true}), react()],
  server: {port: 3000},
  base: "/20_Math_quiz/  ",
});
