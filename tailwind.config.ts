import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@stick-ui/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        success: "#12d16e",
        warning: "#fcb019",
        info: "#00adf2",
        error: "#fc3932",
        brand900: "#291226",
        brand800: "#53254d",
        brand700: "#7c3775",
        brand600: "#a64a9c",
        brand500: "#d05dc3",
        brand400: "#d97dcf",
        brand300: "#F2B2EC",
        brand200: "#ecbee7",
        brand100: "#f5def3",
        brand0: "#D8E5FF",
        neutral900: "#212529",
        neutral800: "#343a40",
        neutral700: "#495057",
        neutral600: "#868e96",
        neutral500: "#adb5bd",
        neutral400: "#ced4da",
        neutral300: "#dee2e6",
        neutral200: "#e9ecef",
        neutral100: "#f1f3f5",
        neutral0: "#f8f9fa",
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
        regular: 400,
        medium: 500,
        bold: 700,
      },
      lineHeight: {
        text: "150%",
        title: "150%",
      },
    },
  },
  plugins: [],
};
export default config;