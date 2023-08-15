/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
    theme: {
        extend: {
            colors: {
                default: {
                    100: '#131317',
                    80: '#2E2E35',
                    60: '#5A5A65',
                    40: '#A0A0A8',
                    20: '#C8C8CE',
                    0: '#F3F3F3',
                    main: '#cfddee',
                },
                primary: {
                    blue: {
                        8: '#071C2F',
                        7: '#052241',
                        6: '#012F59',
                        5: '#202668',
                        4: '#004A84',
                        3: '#81C7FF',
                        2: '#ADCAEB',
                        1: '#DFEEFF',
                    },
                },
                secondary: {
                    purple: '#8280FF',
                    pink: '#C780FF',
                    red: '#FF8080',
                    yellow: '#FFB119',
                    gradientSolutions: 'linear-gradient(291deg, rgba(7, 28, 47, 0.00) 25%, #071C2F 100%)',
                    gradientProblems: 'linear-gradient(291deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
                    blue60: '#03254D',
                    white1: '#D9D9D9',
                    blue: {
                        80: 'rgba(3, 37, 77, 0.80)',
                        60: 'rgba(3, 37, 77, 0.60)',
                        40: 'rgba(3, 37, 77, 0.40)',
                    },
                },
                typo: {
                    black: '#131317',
                    'dark-blue': '#202668',
                    'light-blue': '#586EBA',
                    'dark-grey': '#3A3A3A',
                    'light-grey': '#8A8A8A',
                    white: '#F3F3F3',
                },
                button: {
                    main: '#CFDDEE',
                    blue: '#004A84',
                    hover: '#B7D6FB',
                    'hover-dark': '#2872AC',
                },
                ring: '#EAF3FD',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
