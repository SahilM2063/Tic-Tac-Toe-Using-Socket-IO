/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': { 'max': '320px' },
      // => @media (max-width: 319px) { ... }

      'sm': { 'min': '321px', 'max': '426px' },
      // => @media (min-width: 320px and max-width: 424px) { ... }

      'md': { 'min': '426px', 'max': '768px' },
      // => @media (min-width: 425px and max-width: 767px) { ... }

      'lg': { 'min': '769px', 'max': '1024px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'xl': { 'min': '1024px', 'max': '1439px' },
      // => @media (min-width: 1024px and max-width: 1439px) { ... }

      '2xl': { 'min': '1440px' },
      // => @media (min-width: 1440px) { ... }
    },
    fontFamily: {
      'Gilroy': ['Gilroy', 'ui-sans-serif', 'system-ui'],
      'Dalbys': ['Dalbys', 'ui-sans-serif', 'system-ui'],
    }
    ,
    extend: {},
  },
  plugins: [],
}

