module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ["Dancing Script", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
