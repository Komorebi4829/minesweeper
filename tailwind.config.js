/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          '--app-bg': '#f4f4ec',
          '--bg-cell-initial': 'rgb(192, 192, 192)',
          '--bg-cell-open': 'rgb(192, 192, 192)',
          '--bg-cell-boom': '#ef4444',
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          '--app-bg': 'red',
          // '--bg-cell-initial': 'rgb(192, 192, 192)',
          // '--bg-cell-open': 'rgb(192, 192, 192)',
          '--bg-cell-initial': 'rgb(192, 192, 192)',
          '--bg-cell-open': 'rgb(192, 192, 192)',
          '--bg-cell-boom': 'yellow',
        },
      },
    ],
  },
}
