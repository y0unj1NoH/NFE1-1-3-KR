/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#243868',
        secondary: '#FEF9F1',
        intro: '#3B2A4B',
        'gold-default': '#D6B36D',
        'gold-dark': '#C2955C',
        'gold-light': '#E7CFA5',
        'menu-coral': '#FD9579',
        bookmark: '#DD0000',
        'text-white': '#ECF0F5',
        'text-black': '#333333',
        'text-gray': '#A5A5A5',
        'transparent-yellow': '#838B98',
        sun: '#C3634D',
      },
      fontSize: {
        h1: ['96px', { fontWeight: '700' }],
        h4: ['36px', { fontWeight: '700' }],
        h5: ['24px', { fontWeight: '700' }],
        body1: ['16px', { fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
