/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('nativewind/preset'),
    require('super-app-showcase-sdk/tailwind-preset'),
  ],
  content: [
    './App.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      // booking-specific overrides go here.
      // NOTE: do NOT set `brand` here — it's a shared `var(--color-brand)`.
      // Set booking's brand at runtime via vars() in App.tsx (see that file).
    },
  },
  plugins: [],
};
