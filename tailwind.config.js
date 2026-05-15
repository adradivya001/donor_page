/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#d53f8c',
        'brand-pink-light': '#fed7e2',
        'brand-pink-soft': '#fff5f7',
        'brand-purple': '#805ad5',
        'brand-purple-hover': '#6b46c1',
        'brand-text': '#2d3748',
        
        navy: {
          primary: '#d53f8c',
          light: '#ed64a6',
          dark: '#b83280',
        },
        green: {
          accent: '#805ad5',
          hover: '#6b46c1',
        },
        neutral: {
          light: '#f7fafc',
          dark: '#4a5568',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        'card': '24px',
        'button': '12px',
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(213, 63, 140, 0.1)',
        'large': '0 30px 60px -12px rgba(0, 0, 0, 0.1)',
        'purple-glow': '0 10px 20px rgba(128, 90, 213, 0.3)',
        'pink-glow': '0 10px 20px rgba(213, 63, 140, 0.2)',
      }
    },
  },
  plugins: [],
}
