/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
        'screen-3xl': '1920px',
        'screen-4xl': '2560px',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
