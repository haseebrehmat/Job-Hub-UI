/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                gruppo: ['Gruppo', 'cursive'],
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
