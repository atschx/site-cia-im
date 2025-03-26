/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./blog/**/*.{mdx,md}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'link-blue': '#2a7ae2',
        'visited-link': '#1756a9',
        'text-gray': '#828282',
        'border-gray': '#e8e8e8',
        'code-bg': '#eef',
        'dark-bg': '#121212',
        'dark-text': '#e0e0e0',
        'dark-border': '#333333',
        'dark-link': '#56a0ff',
        'dark-visited-link': '#a0c0ff',
        'dark-code-bg': '#1e293b',
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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.link-blue'),
              '&:hover': {
                color: theme('colors.gray.900'),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.dark-text'),
            a: {
              color: theme('colors.dark-link'),
              '&:hover': {
                color: theme('colors.white'),
              },
            },
            h1: {
              color: theme('colors.dark-text'),
            },
            h2: {
              color: theme('colors.dark-text'),
            },
            h3: {
              color: theme('colors.dark-text'),
            },
            h4: {
              color: theme('colors.dark-text'),
            },
            h5: {
              color: theme('colors.dark-text'),
            },
            h6: {
              color: theme('colors.dark-text'),
            },
            strong: {
              color: theme('colors.dark-text'),
            },
            code: {
              color: theme('colors.dark-text'),
            },
            figcaption: {
              color: theme('colors.gray.400'),
            },
            blockquote: {
              color: theme('colors.gray.400'),
              borderLeftColor: theme('colors.dark-border'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

