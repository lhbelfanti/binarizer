import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      backgroundImage: {
        'green-pink-gradient': 'linear-gradient(to right, rgb(205, 233, 182), rgb(234, 56, 123))',
        'blue-purple-gradient': 'linear-gradient(to right, rgb(59, 131, 246), rgb(138, 92, 246))',
      },
    },
  },
  plugins: [],
} satisfies Config;
