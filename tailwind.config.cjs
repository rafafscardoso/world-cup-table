/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },

      colors: {
        default: {
          300: "#fb044b",
          500: "#c20c43",
          700: "#8b153c",
        },
        dark: {
          900: "#211223",
        },
        cream: {
          500: "#eae9e1",
          300: "#E9E8E2",
        },
        golden: {
          500: "#cbb25c",
        },
      },
    },
  },
  plugins: [],
};
