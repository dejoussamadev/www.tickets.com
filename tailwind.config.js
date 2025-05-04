/** @type {import('tailwindcss').Config} */

const addValues = (max, unit = null) => {
  let values = {};
  for (let i = 1; i <= max; i++) {
    if (unit === 'rem') {
      values[i] = `${i / 10}${unit}`;
    } else {
      values[i] = `${i}${unit || ''}`;
    }
  }
  return values;
};

module.exports = {
  content: [
    './src/**/*.{html,ts}', // Include all HTML and TypeScript files
  ],
  theme: {
    extend: {
      fontSize: {
        ...addValues(200, 'rem'), // Limit to 100 values
      },
      spacing: {
        ...addValues(200, 'rem'), // Add custom spacing values
      },
      lineHeight: {
        ...addValues(200, 'rem'), // Add custom lineHeight values
      },
    },
  },
  plugins: [],
};
