/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        morph: {
          '0%, 100%': {
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
          },
          '50%': {
            borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%'
          },
        }
      },
      animation: {
        morph: "morph 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
