import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#05080D",
        surface: "#0E1724",
        "surface-soft": "#111827",
        "text-primary": "#F8FAFC",
        "text-secondary": "#CBD5E1",
        muted: "#64748B",
        accent: "#2D7CFF",
        "accent-soft": "#6EE7F9",
        success: "#10B981"
      },
      boxShadow: {
        glow: "0 0 40px rgba(45, 124, 255, 0.28)",
        card: "0 24px 80px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
