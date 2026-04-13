import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F4EF",
        foreground: "#1E1E1E",
        primary: "#1E1E1E",
        accent: "#5A6A4F",
        muted: "#6B6B6B",
        secondary: "#EAE6DE",
        border: "#D1CDD2",
        gold: "#C8A96A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": "0.65rem",
      },
    },
  },
  plugins: [],
};

export default config;
