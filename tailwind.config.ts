import type { Config } from "tailwindcss";
import { applyButtonClasses, applyPrimaryColorAndShade } from "@istic-ui/react";
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@istic-ui/react/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern:
        /^(bg|text|border)-(brand|neutral)-(0|100|200|300|400|500|600|700|800|900|950)$/,
    },
    {
      pattern: /btn-(filled|outline|subtle|light)$/,
    },
    {
      pattern: /rounded-(input|button|search-input)-(xs|sm|md|lg|xl)$/,
    },
  ],
  theme: {
    primaryShade: 600,
    primaryColor: "brand",
    extend: {
      colors: {
        white: "#ffffff",
        success: "#12d16e",
        warning: "#fcb019",
        info: "#00adf2",
        error: "#fc3932",

        brand: {
          950: "#31153d",
          900: "#291226",
          800: "#53254d",
          700: "#7c3775",
          600: "#a64a9c",
          500: "#d05dc3",
          400: "#d97dcf",
          300: "#F2B2EC",
          200: "#ecbee7",
          100: "#f5def3",
          50: "#f3e0f1",
        },
        neutral: {
          950: "#212529",
          900: "#212529",
          800: "#343a40",
          700: "#495057",
          600: "#868e96",
          500: "#adb5bd",
          400: "#ced4da",
          300: "#dee2e6",
          200: "#e9ecef",
          100: "#f1f3f5",
          50: "#f8f9fa",
        },
      },

      fontFamily: {
        default: ["Mulish", "sans-serif"],
      },

      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",

        "button-xs": "0.75rem",
        "button-sm": "0.875rem",
        "button-md": "1rem",
        "button-lg": "1.125rem",
        "button-xl": "1.25rem",

        "title-h1": "3rem",
        "title-h2": "2.5rem",
        "title-h3": "2rem",
        "title-h4": "1.5rem",
        "title-h5": "1.25rem",
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },
      lineHeight: {
        text: "150%",
        title: "150%",
      },
      borderRadius: {
        "input-xs": "5px",
        "input-lg": "5px",

        "search-input-xs": "5px",
        "search-input-lg": "5px",

        "button-xs": "5px",
        "button-sm": "5px",
        "button-md": "5px",
        "button-lg": "5px",
        "button-xl": "5px",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0.4",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translate3d(-100%, 0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translate3d(100%, 0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translate3d(-50%, 100%, 0)" },
          "100%": { opacity: "1", transform: "translate3d(-50%, -50%, 0)" },
        },
        "fade-out-up": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translate3d(0, -100%, 0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translate3d(0, -100%, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "chip-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "chip-scale-right": {
          "0%": {
            transform: "scaleX(0.6)",
            transformOrigin: "0% 0%",
            opacity: "1",
          },
          "100%": {
            transform: "scaleX(1)",
            transformOrigin: "0% 0%",
            opacity: "1",
          },
        },
        "progress-bar": {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        fadeIn: "fade-in .2s ease-in-out",
        fadeInLeft: "fade-in-left .2s ease-in-out",
        fadeInRight: "fade-in-right .2s ease-in-out",
        fadeInUp: "fade-in-up 0.3s ease-in-out",
        fadeInDown: "fade-in-down 0.2s ease-in-out",
        fadeOutUp: "fade-out-up 0.2s ease-in-out",
        chipFadeIn: "chip-fade-in 0.3s ease-in-out",
        chipScaleRight:
          "chip-scale-right 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        progressBar: "progress-bar linear",
      },
    },
  },
  plugins: [applyButtonClasses, applyPrimaryColorAndShade],
};
export default config;
