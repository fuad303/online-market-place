/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "10px", // Custom small screen breakpoint
        md: "512px", // Custom medium screen breakpoint
        lg: "850px", // Custom large screen breakpoint
        xl: "1280px", // Custom extra-large screen breakpoint
      },
    },
  },
  plugins: [],
};
