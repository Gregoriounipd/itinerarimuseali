module.exports = {
  theme: {
    extend: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif'],
          },
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}

module.exports = {
  darkMode: 'media', // oppure 'class' se vuoi controllarla tu
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}


