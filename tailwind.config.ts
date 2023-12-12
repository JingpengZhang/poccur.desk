/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                primary:'#1677ff',
                mainBg:'#f6f7f8'
            }
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    }
}

