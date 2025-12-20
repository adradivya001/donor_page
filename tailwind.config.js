/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'soft-pink': '#FDF2F8',
                'soft-pink-accent': '#FFE5EC',
                'deep-teal': '#0D9488',
                'bold-pink': '#EC4899',
                'warm-white': '#FAFAFA',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
