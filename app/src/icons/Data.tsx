interface SVG {
    className?: string;
}

const Data = ({ className }: SVG) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21 7C21 9.21 16.97 11 12 11C7.03 11 3 9.21 3 7M21 7C21 4.79 16.97 3 12 3C7.03 3 3 4.79 3 7M21 7V12M3 7V12M21 12C21 14.21 16.97 16 12 16C7.03 16 3 14.21 3 12M21 12V17C21 19.21 16.97 21 12 21C7.03 21 3 19.21 3 17V12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Data;
