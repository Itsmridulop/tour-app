/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-lg': '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}