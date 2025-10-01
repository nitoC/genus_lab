// tailwind.config.ts (or .js)
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true, // 👈 makes Tailwind utilities override RSuite
};

export default config;
