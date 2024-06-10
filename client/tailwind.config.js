/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1040px",
      },
    },
    extend: {
      colors: {
        "cds-background": "#161616",
        "cds-background-secondary": "#1d1d1d",
        "cds-background-light": "#f4f4f4",
        "cds-hover": "rgba(141, 141, 141, 0.16)",
        "cds-active": "rgba(141, 141, 141, 0.4)",
        "cds-border": "#393939",
        "cds-w-bg-hover": "rgba(141, 141, 141, 0.12)",
        "cds-w-bg-active": "rgba(141, 141, 141, 0.5)",
        "cds-focus": "#0f62fe",
      },
    },
  },
  plugins: [],
};
