/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...defaultConfig,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        // Supermal Karawaci Brand Colors
        primary: "#121421",
        secondary: "#D4AF37",
        accent: "#1F2937",
        gold: "#D4AF37",
        "dark-gray": "#1F2937",
        "light-gray": "#F8FAFC",
        "onyx-gray": "#2A2F3A",

        // System colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",

        // Surface colors
        background: "#121421",
        surface: "#1F2937",
        "surface-light": "#F8FAFC",
        "surface-elevated": "#2A2F3A",

        // Text colors
        text: {
          primary: "#FFFFFF",
          secondary: "#D1D5DB",
          tertiary: "#9CA3AF",
          inverse: "#121421",
          gold: "#D4AF37",
          light: "#F3F4F6",
          muted: "#6B7280",
        },

        // Interactive colors
        interactive: {
          button: "#D4AF37",
          "button-hover": "#B8941F",
          "button-disabled": "#6B7280",
          link: "#D4AF37",
          border: "#374151",
          focus: "#D4AF37",
        },

        // Member tier colors
        tier: {
          gold: "#D4AF37",
          platinum: "#E5E7EB",
          diamond: "#60A5FA",
          bronze: "#CD7F32",
        },

        // Status colors
        status: {
          pending: "#F59E0B",
          approved: "#10B981",
          rejected: "#EF4444",
          processing: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-gold": "pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "bounce-subtle": "bounceSubtle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.7)" },
          "50%": { boxShadow: "0 0 0 10px rgba(212, 175, 55, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      boxShadow: {
        gold: "0 4px 14px 0 rgba(212, 175, 55, 0.39)",
        premium: "0 8px 32px rgba(0, 0, 0, 0.32)",
        elevated: "0 4px 20px rgba(0, 0, 0, 0.15)",
        glow: "0 0 20px rgba(212, 175, 55, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    ...defaultConfig.plugins,
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
}
