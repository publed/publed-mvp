/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
    theme: {
        extend: {
            colors: {
                default: {
                    40: '#A0A0A8',
                    20: '#C8C8CE',
                    main: '#cfddee',
                },
                blue: {
                    7: '#071C2F',
                    6: '#012F59',
                    5: '#202668',
                    4: '#004A84',
                    3: '#81C7FF',
                    2: '#ADCAEB',
                    1: '#DFEEFF',
                },
                primary: {
                    blue: {
                        7: '#052241',
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
                    'typo-white': '#f3f3f3',
                },
            },
        },
        textColor: {
            default: {
                80: '#2E2E35',
                40: '#A0A0A8',
                20: '#C8C8CE',
                60: '#5A5A65',
            },
            'secondary-red': '#FF8080',
            'secondary-yellow': '#FFB119',
            'typo-dark-blue': '#202668',
            'typo-white': '#f3f3f3',
            'typo-grey': '#8a8a8a',
            'typo-dark-grey': '#3A3A3A',
            'typo-black': '#131317',
            'primary-blue': {
                3: '#81c7ff',
            },
            'secondary-pink': '#C780FF',
            'secondary-purple': '#8280FF',
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
