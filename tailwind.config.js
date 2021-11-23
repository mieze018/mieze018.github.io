module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      golden: '16.18vh'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
