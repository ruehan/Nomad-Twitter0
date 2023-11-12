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
      gridTemplateColumns: {
        '3': 'repeat(3, minmax(0, 1fr))', // 가로 3칸
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
