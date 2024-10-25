/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#CCD9E2",
          200: "#99B3C6",
          300: "#668EA9",
          400: "#33688D",
          500: "#004270",
          600: "#00355A",
          700: "#002843",
          900: "#001A2D",
        },
        secondary: {
          100: "#D9F0F9",
          200: "#B3E1F4",
          300: "#8DD2EE",
          400: "#67C3E9",
          500: "#41B4E3",
          600: "#3490B6",
          700: "#276C88",
          900: "#1A485B",
        },
        tertiary: {
          100: "#E6F0CC",
          200: "#CEE099",
          300: "#B5D166",
          400: "#9DC133",
          500: "#84B200",
          600: "#6A8E00",
          700: "#4F6B00",
          900: "#354700",
        },
      },
    },
  },
  plugins: [],
};
