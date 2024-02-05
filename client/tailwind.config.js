/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': { 'max': '319px' },
      // => @media (max-width: 319px) { ... }

      'sm': { 'min': '320px', 'max': '425px' },
      // => @media (min-width: 320px and max-width: 424px) { ... }

      'md': { 'min': '426px', 'max': '767px' },
      // => @media (min-width: 425px and max-width: 767px) { ... }

      'lg': { 'min': '768px', 'max': '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'xl': { 'min': '1024px', 'max': '1439px' },
      // => @media (min-width: 1024px and max-width: 1439px) { ... }

      '2xl': { 'min': '1440px' },
      // => @media (min-width: 1440px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

