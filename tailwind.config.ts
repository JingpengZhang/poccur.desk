/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1767f5',
        mainBg: '#f6f7f8'
      },
      fontFamily: {
        apex: 'ApexMk2'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

