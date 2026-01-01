/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: "#000000",
          dark: "#050508",
          void: "#0B0B12",
          accent: "#1A1A2E",
        },
        cosmic: {
          blue: "#1E3A8A", // Deep space blue
          cyan: "#0EA5E9", // Atmosphere glow
          purple: "#7C3AED", // Nebula
          gold: "#F59E0B", // Star light
          detail: "#94A3B8", // Scientific text
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"], // Premium display font
        mono: ["JetBrains Mono", "monospace"], // For data/coordinates
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(14, 165, 233, 0.2)" },
          "100%": {
            boxShadow:
              "0 0 20px rgba(14, 165, 233, 0.6), 0 0 10px rgba(14, 165, 233, 0.4)",
          },
        },
      },
    },
  },
  plugins: [],
};
