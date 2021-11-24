module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        square: 'calc((92vh + 92vw) /2)',
        golden61v: '61.8vw',
        golden38v: '38.2vw',
        golden23v: '23.6vw'
      },
      spacing: {
        square: 'calc((92vh + 92vw) /2)',
        golden61v: '61.8vw',
        golden38v: '38.2vw',
        golden23v: '23.6vw'
      },
      backgroundImage: {
        surface: `url('img/surface.webp')`
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
