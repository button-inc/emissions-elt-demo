module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        2000: "2000",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
