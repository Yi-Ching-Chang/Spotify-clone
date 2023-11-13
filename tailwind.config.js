/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "login-btn-color": "#18D860",
        "sidebar-btn-color": "#121212",
        "sidebar-btn-hover": "#111111",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
