module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        square: 'calc((92vh + 92vw) /2)',
        golden61vw: '61.8vw',
        golden61vh: '61.8vh',
        golden38vw: '38.2vw',
        golden38vh: '38.2vh',
        golden23vw: '23.6vw',
        golden23vh: '23.6vh'
      },
      spacing: {
        square: 'calc((92vh + 92vw) /2)',
        golden61vw: '61.8vw',
        golden61vh: '61.8vh',
        golden38vw: '38.2vw',
        golden38vh: '38.2vh',
        golden23vw: '23.6vw',
        golden23vh: '23.6vh'
      },
      backgroundImage: {
        surface: `url('img/surface.webp')`
      },
      transitionProperty: {
        header: {
          'transition-property': 'all',
          'transition-timing-function': 'ease-in-out',
          'transition-duration': '2000ms'
        }
      }
    }
  },
  variants: {
    extend: {
      mixBlendMode: ['hover', 'focus']
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
};
