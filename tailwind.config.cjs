/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                gruppo: ['Gruppo', 'cursive'],
            },
        },
        screens: {
            sm: '200px',
            // => @media (min-width: 576px) { ... }

            md: '1200px',
            // => @media (min-width: 960px) { ... }

            lg: '1700px',
            // => @media (min-width: 1440px) { ... }
        },
    },
    plugins: [],
}
