interface SVG {
    className?: string;
}

const Close = ({ className }: SVG) => {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g id="ic:round-close">
                <path d="M15.2502 4.75852C15.1731 4.68127 15.0815 4.61998 14.9807 4.57816C14.8799 4.53634 14.7718 4.51482 14.6627 4.51482C14.5535 4.51482 14.4455 4.53634 14.3447 4.57816C14.2439 4.61998 14.1523 4.68127 14.0752 4.75852L10.0002 8.82519L5.92519 4.75019C5.84804 4.67303 5.75644 4.61183 5.65564 4.57008C5.55484 4.52833 5.4468 4.50684 5.33769 4.50684C5.22858 4.50684 5.12054 4.52833 5.01973 4.57008C4.91893 4.61183 4.82734 4.67303 4.75019 4.75019C4.67303 4.82734 4.61183 4.91893 4.57008 5.01973C4.52833 5.12054 4.50684 5.22858 4.50684 5.33769C4.50684 5.4468 4.52833 5.55484 4.57008 5.65564C4.61183 5.75644 4.67303 5.84804 4.75019 5.92519L8.82519 10.0002L4.75019 14.0752C4.67303 14.1523 4.61183 14.2439 4.57008 14.3447C4.52833 14.4455 4.50684 14.5536 4.50684 14.6627C4.50684 14.7718 4.52833 14.8798 4.57008 14.9806C4.61183 15.0814 4.67303 15.173 4.75019 15.2502C4.82734 15.3273 4.91893 15.3885 5.01973 15.4303C5.12054 15.472 5.22858 15.4935 5.33769 15.4935C5.4468 15.4935 5.55484 15.472 5.65564 15.4303C5.75644 15.3885 5.84804 15.3273 5.92519 15.2502L10.0002 11.1752L14.0752 15.2502C14.1523 15.3273 14.2439 15.3885 14.3447 15.4303C14.4455 15.472 14.5536 15.4935 14.6627 15.4935C14.7718 15.4935 14.8798 15.472 14.9806 15.4303C15.0814 15.3885 15.173 15.3273 15.2502 15.2502C15.3273 15.173 15.3885 15.0814 15.4303 14.9806C15.472 14.8798 15.4935 14.7718 15.4935 14.6627C15.4935 14.5536 15.472 14.4455 15.4303 14.3447C15.3885 14.2439 15.3273 14.1523 15.2502 14.0752L11.1752 10.0002L15.2502 5.92519C15.5669 5.60852 15.5669 5.07519 15.2502 4.75852Z" />
            </g>
        </svg>
    );
};

export default Close;