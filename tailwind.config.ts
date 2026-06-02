import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          950: "#0f2419",
          900: "#1A3A2A",
          800: "#1e4a35",
          700: "#256040",
          600: "#2d7a52",
        },
        gold: {
          DEFAULT: "#C9A84C",
          dark: "#b8942f",
          light: "#d4b86a",
        },
        cream: {
          DEFAULT: "#FAFAF8",
          dark: "#F0F0EC",
        },
        brand: {
          black: "#0D0D0D",
          gray: "#E8E8E4",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
