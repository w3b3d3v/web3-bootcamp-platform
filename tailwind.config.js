module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        green: {
          100: '#96FF33',
          200: '#81FF0A',
          300: '#6CE200',
          400: '#59B800',
          500: '#3B7A00',
        },
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },

  plugins: [],
}
