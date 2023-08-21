interface ButtonI {
    variant: 'light' | 'blue' | 'secondary' | 'small';
    className?: string;
    onClick?: () => void;
    children: string;
}
const Button = ({ variant, className, onClick, children }: ButtonI) => {
    const variants = {
        light: 'px-9 py-[10px] rounded-full bg-regular-blue-20 text-dark-blue-60 font-medium hover:bg-regular-blue-30 focus:bg-regular-blue-20 form-ring',
        blue: 'px-9 py-[10px] rounded-full bg-dark-blue-60 text-default-0 font-medium hover:bg-dark-blue-50 focus:bg-dark-blue-60 form-ring',
        secondary:
            'px-9 py-[10px] rounded-full border border-dark-blue-30 bg-transparent text-default-0 font-medium hover:bg-dark-blue-60 hover:border-0 focus:bg-transparent form-ring',
        small: 'px-5 py-2 rounded-full border border-dark-blue-60 bg-regular-blue-20 text-dark-blue-60 text-sm font-medium hover:bg-regular-blue-30 focus:bg-regular-blue-20 form-ring',
    };
    return (
        <button onClick={onClick} className={`${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
