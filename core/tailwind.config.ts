// https://tailwindcss.com/docs/configuration
// https://tailwindcss.com/docs/plugins

import plugin from 'tailwindcss/plugin'

module.exports = {
  content: [
    // include Nuxt Content files into array scanned by Tailwind CSS
    '{srcDir}/content/**/*.{md,yml,json}',
  ],
  theme: {
    // example of extending Tailwind CSS with custom color
    extend: {
      colors: {
        feature: '#3CB371',
      },
    },
  },
  plugins: [
    // example how to enable custom color class inside @apply directive
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.text-feature': {
          color: theme('colors.feature'),
        },
      })
    }),
  ],
}
