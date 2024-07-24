/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'pink-white': "#FFDFD6",
      'pink-purple': "#E3A5C7",
      'light-pupple': "#B692C2",
      'purple': "#694F8E"
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

