interface SVG {
    className?: string;
}

const Document = ({ className }: SVG) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1007_3271)">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.586 2C15.0556 2.00011 15.5101 2.16543 15.87 2.467L16 2.586L20.414 7C20.746 7.33202 20.9506 7.77028 20.992 8.238L21 8.414V20C21.0002 20.5046 20.8096 20.9906 20.4665 21.3605C20.1234 21.7305 19.6532 21.9572 19.15 21.995L19 22H5C4.49542 22.0002 4.00943 21.8096 3.63945 21.4665C3.26947 21.1234 3.04284 20.6532 3.005 20.15L3 20V4C2.99984 3.49542 3.19041 3.00943 3.5335 2.63945C3.87659 2.26947 4.34684 2.04284 4.85 2.005L5 2H14.586ZM13 4H5V20H19V10H14.5C14.1271 9.99998 13.7676 9.86108 13.4916 9.61038C13.2156 9.35968 13.0428 9.01516 13.007 8.644L13 8.5V4ZM15 4.414V8H18.586L15 4.414Z"
                />
            </g>
            <defs>
                <clipPath id="clip0_1007_3271">
                    <rect width="24" height="24" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Document;
