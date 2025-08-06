// tailwind.config.js

export default {
  content: ["./src/**/*.{js,jsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)",
          text4: "var(--global-text-4)",
          text5: "var(--global-text-5)"
        },
        button: {
          background1: "var(--button-bg-1)"
        },
        footer: {
          background1: "var(--footer-bg-1)"
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};
