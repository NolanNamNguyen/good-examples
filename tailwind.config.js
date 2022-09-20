/** @type {import("tailwindcss").Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-font': '#000000',
        'loading-background-color': '#FFFFFF59',
      },
      fontSize: {
        'etp-title-1': [
          '24px',
          {
            letterSpacing: '0.05em',
            lineHeight: 'calc(29 / 24)',
          },
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          // Class name
          'mui-field-span': (value) => {
            return {
              '& .Mui-focused': {
                '& fieldset': {
                  '& span': {
                    width: `${value}`,
                  },
                },
              },
            };
          },
          'mui-field-label': (value) => {
            return {
              '& label': {
                fontSize: `${value}`,
              },
            };
          },
        },
        null,
      );
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};
