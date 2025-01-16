/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#243325",
        tableBgColor: "#212124",
        tableHeaderTextColor: "#67703a",
        tableHeaderTextBgColor: "#161718",
        disableTextColor: "#6d6e6f",
        customTextColor: "#cceb50",
      },
    },
  },
  plugins: [],
};
