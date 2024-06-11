/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  tailwindFunctions: ['tw'],
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
