/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: '#2e353f',
        primary: '#005b99',
        accent: '#d1dce5',
        heading: '#1a202c',
      },
      fontFamily: {
        sans: ['MontserratVariable', 'system-ui'],
        serif: ['Merriweather', 'Georgia']
      },
      spacing: {
        8: '2rem',
        12: '3rem'
      },
      maxWidth: {
        wrapper: '42rem'
      }
    }
  },
  plugins: [],
}
