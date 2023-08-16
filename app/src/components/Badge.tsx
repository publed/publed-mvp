import Done from '../icons/Done';
import Time from '../icons/Time';
import Close from '../icons/Close';

interface IBadge {
    variant: 'success' | 'pending' | 'rejected';
}

const variants = {
    success: {
        label: 'Reviewed',
        cardColor: 'bg-system-success/10 border-system-success',
        textColor: 'text-system-success',
        icon: <Done className="fill-system-success" />,
    },
    pending: {
        label: 'Pending',
        cardColor: 'bg-system-warning/10 border-system-warning',
        textColor: 'text-system-warning',
        icon: <Time className="fill-system-warning" />,
    },
    rejected: {
        label: 'Rejected',
        cardColor: 'bg-system-error/10 border-system-error',
        textColor: 'text-system-error',
        icon: <Close className="fill-system-error" />,
    },
};

const Badge = ({ variant }: IBadge) => {
    const { label, cardColor, textColor, icon } = variants[variant];

    return (
        <div className={`rounded-full px-[14px] py-[6px] border flex gap-4 ${cardColor}`}>
            {icon} <p className={`font-medium leading-tight ${textColor}`}>{label}</p>
        </div>
    );
};

export default Badge;
