// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,astro}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter", sans-serif'],
      },
      colors: {
        brand: {
          dark: "#1c1c28",
          primary: "#4f46e5",
          secondary: "#9333ea",
          accent: "#10b981",
        },
      },
    },
  },
  plugins: [],
};
