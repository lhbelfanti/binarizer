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
        point: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
        point: 'point 1s ease-in-out infinite',
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
