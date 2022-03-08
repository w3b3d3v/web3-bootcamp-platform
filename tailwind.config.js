module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#8BFF1F',
          200: '#76F500',
          300: '#6CE200',
          400: '#458F00',
          500: '#1E3D00',
        },
        white: {
          100: '#FFFFFF',
          200: '#F5F5F5',
          300: '#D6D6D7',
        },
        black: {
          100: '#404040',
          200: '#171717',
          300: '#090808',
          400: '#000000',
        },
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },

  plugins: [],
}
