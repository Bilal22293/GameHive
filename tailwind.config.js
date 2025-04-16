/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F", // page background
        surface: "#1A1A1A", // card/container backgrounds
        primary: "#FFCE3D", // main accent (yellow / Hive)
        secondary: "#5BE3B7", // secondary accent (mint)
        heading: "#FFFFFF", // primary text
        subtext: "#AAAAAA", // secondary/desc text
        border: "#2E2E2E", // borders & dividers

        // neon vibes
        neon: {
          purple: "#B66CFF",
          blue: "#3B82F6",
          red: "#FF3E5F",
        },
        // primary: {
        //   DEFAULT: '#4f46e5',
        //   50: '#eff6ff',
        //   100: '#dbeafe',
        //   200: '#bfdbfe',
        //   300: '#93c5fd',
        //   400: '#60a5fa',
        //   500: '#3b82f6',
        //   600: '#2563eb',
        //   700: '#1d4ed8',
        //   800: '#1e40af',
        //   900: '#1e3a8a',
        // },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fill, minmax(15rem, 1fr))",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 1s ease-in-out both",
        "gradient-x": "gradient-x 3s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
