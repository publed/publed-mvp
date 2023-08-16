interface ButtonI {
    variant: 'light' | 'blue' | 'secondary' | 'small';
    onClick?: () => void;
    children: string;
}
const Button = ({ variant, onClick, children }: ButtonI) => {
    const variants = {
        light: 'rounded-full px-9 py-3 leading-tight font-medium text-typo-dark-blue bg-button-main hover:bg-button-hover focus:bg-button-main focus:ring-ring focus:ring-4',
        blue: 'rounded-full px-9 py-3 leading-tight font-medium text-typo-white bg-button-blue hover:bg-button-hover-dark focus:bg-button-blue focus:ring-ring focus:ring-4',
        secondary:
            'rounded-full px-9 py-3 leading-tight font-medium text-typo-white bg-transparent border border-button-main hover:bg-button-blue focus:bg-transparent focus:ring-ring focus:ring-4',
        small: 'rounded-full px-5 py-2 text-sm text-typo-dark-blue bg-button-main border border-button-blue hover:bg-button-hover focus:bg-button-main focus:ring-ring focus:ring-4',
    };
    return (
        <button onClick={onClick} className={variants[variant]}>
            {children}
        </button>
    );
};

export default Button;
