module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      main: ['DM Sans'],
    },
  },
  extend: {
    colors: {
      primary: {
        50: '#9aa9b5',
        100: '#8193a2',
        200: '#687d8f',
        300: '#4f687d',
        400: '#35526a',
        500: '#1c3d58',
        600: '#032745',
        700: '#03233e',
        800: '#021f37',
        900: '#021b30',
      },
      accent: {
        50: '#f69bcd',
        100: '#f482c1',
        200: '#f169b4',
        300: '#ef50a8',
        400: '#ed379b',
        500: '#ea1e8f',
        600: '#e80582',
        700: '#d10575',
        800: '#ba0468',
        900: '#a2045b',
      },
      secondary: {
        50: '#bbcedd',
        100: '#aac2d5',
        200: '#99b5cd',
        300: '#88a9c4',
        400: '#779dbc',
        500: '#6690b3',
        600: '#5584ab',
        700: '#4d779a',
        800: '#446a89',
        900: '#3b5c78',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};