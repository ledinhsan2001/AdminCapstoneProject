/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./public/index.html"],
    theme: {
        extend: {
            backgroundColor: {
                "overlay-70": "rgba(0,0,0,0.3)",
                "overlay-30": "rgba(0,0,0,0.7)",
            },
        },
    },
    plugins: [],
};
