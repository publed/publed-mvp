/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
    theme: {
        extend: {
            colors: {
                default: {
                    100: '#131317',
                    90: '#202023',
                    80: '#2E2E35',
                    70: '#3F3F46',
                    60: '#5A5A65',
                    50: '#71717A',
                    40: '#A0A0A8',
                    30: '#C8C8CE',
                    20: '#D4D4D8',
                    10: '#E4E4E7',
                    0: '#F3F3F3',
                    main: '#cfddee',
                },
                'dark-blue': {
                    100: '#000C17',
                    90: '#001223',
                    80: '#01182F',
                    70: '#012446',
                    60: '#01284E',
                    50: '#4D6983',
                    40: '#99A9B8',
                    30: '#C0C9D3',
                    20: '#E6EAED',
                    10: '#F2F4F6',
                },
                'regular-blue': {
                    100: '#002D38',
                    90: '#004455',
                    80: '#005B71',
                    70: '#0088A9',
                    60: '#0097BC',
                    50: '#4DB6D0',
                    40: '#99D5E4',
                    30: '#BFE5EE',
                    20: '#E6F5F8',
                    10: '#F2FAFC',
                },
                'light-blue': {
                    100: '#35474A',
                    90: '#4F6B70',
                    80: '#698F95',
                    70: '#9ED6DF',
                    60: '#AFEEF8',
                    50: '#C7F3FA',
                    40: '#DFF8FC',
                    30: '#EBFBFD',
                    20: '#F7FDFE',
                    10: '#FBFEFF',
                },
                secondary: {
                    purple: '#8280FF',
                    pink: '#C780FF',
                    red: '#FF8080',
                    yellow: '#FFB119',
                },
                'background-grey': '#FAFAFA',
                system: {
                    disabled: '#B6B6B6',
                    error: '#BE1717',
                    warning: '#EE8D0F',
                    success: '#088E52',
                },
                ring: '#EAF3FD',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};