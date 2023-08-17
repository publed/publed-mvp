interface SVG {
    className?: string;
}

const Slides = ({ className }: SVG) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 4H4V17H21V4Z" stroke-width="2" stroke-linejoin="round" />
            <path
                d="M8.7 21L12.5 17.2222L16.3 21M7.7139 13.0492L10.3938 10.4482L12.5038 12.5L17.2343 7.78722M3 4H22"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default Slides;
