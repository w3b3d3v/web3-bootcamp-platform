module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#99E24D',
          200: '#4D98E2',
          300: '#4CE577',
          400: '#795CE5',
          500: '#263326',
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
      sans: ['Barlow', 'sans-serif'],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
