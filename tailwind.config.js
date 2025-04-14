/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // We can customize the color palette here based on the design
      },
      fontFamily: {
        // The prototype uses Inter font
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}