import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#f5f5f7",
          text: "#1c1c1e",
          subtle: "#d2d2d6",
          accent: "#0a84ff"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
