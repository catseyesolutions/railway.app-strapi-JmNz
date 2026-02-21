// tailwind.config.js (or tailwind.config.ts if using TS)
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',              // Strapi backend/content if needed
    './src/admin/**/*.{js,jsx,ts,tsx,html}',   // Critical: admin panel files
    './node_modules/@strapi/**/*.{js,jsx,ts,tsx}',  // If Strapi UI components use Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};