/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./blog/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        'link-blue': '#2a7ae2',
        'visited-link': '#1756a9',
        'text-gray': '#828282',
        'border-gray': '#e8e8e8',
        'code-bg': '#eef',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'title': '3rem',
        'post-title': '42px',
        'footer-heading': '18px',
        'post-meta': '14px',
        'post-link': '24px',
      },
    },
  },
  plugins: [],
}

