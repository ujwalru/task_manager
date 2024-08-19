/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your React components
    "./index.html", // Include your HTML file for potential class usage
  ],
  theme: {
    extend: {}, // Add any theme extensions here
  },
  plugins: [], // Add any Tailwind plugins here
};
