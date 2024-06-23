/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-light-blue': '#3a7bfd',
        'very-light-gray': 'hsl(0, 0%, 98%)',
        'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
        'light-grayish-blue': 'hsl(233, 11%, 84%)',
        'dark-grayish-blue': 'hsl(236, 9%, 61%)',
        'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',
        'very-dark-blue': 'hsl(235, 21%, 11%)',
        'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
        'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
        'very-dark-grayish-blue-2': 'hsl(237, 14%, 26%)',
      },
      backgroundImage: {
        'check-bg':
          'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      },
      borderImage: {
        'hover-bg':
          'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      },
      screens: {
        phone: '375px',
        desktop: '1440px',
      },
    },
    screens: {
      sm: '375px',
    },
  },
  plugins: [],
};
