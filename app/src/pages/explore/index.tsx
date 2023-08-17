import ResearchCard from '../../components/ResearchCard';

const Explore = () => {
    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="w-[800px] mx-auto mt-10">
                <div className="mb-8 space-x-2">
                    <Pill label="All" isActive />
                    <Pill label="Free" />
                    <Pill label="Premium" />
                </div>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <ResearchCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Pill = ({ label, isActive }: any) => {
    return (
        <div
            className={`rounded-full px-5 py-[10px] inline-block border border-dark-blue-30 uppercase bg-white font-medium text-default-80 ${
                isActive ? 'bg-dark-blue-30' : ''
            }`}
        >
            {label}
        </div>
    );
};

// three random paper entries
const data = [
    {
        title: 'CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems',
        author: 'CertiK',
        tag: 'Free',
        doi: 'N/A',
        status: 'success',
    },
    {
        title: 'CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems',
        author: 'CertiK',
        tag: 'Premium',
        doi: 'N/A',
        status: 'pending',
    },
    {
        title: 'CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems',
        author: 'CertiK',
        tag: 'Free',
        doi: 'N/A',
        status: 'rejected',
    },
];

export default Explore;
