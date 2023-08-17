import Badge from './Badge';
// icons
import Document from '../icons/Document';
import Data from '../icons/Data';
import Video from '../icons/Video';
import Slides from '../icons/Slides';
import Code from '../icons/Code';

interface ResearchCardProps {
    title: string;
    author: string;
    tag: 'Free' | 'Premium';
    doi: string;
    status: 'success' | 'pending' | 'rejected';
}

const ResearchCard = ({ title, author, tag, doi, status }: ResearchCardProps) => {
    return (
        <div className="bg-white p-5 w-[800px] border rounded-lg">
            <div className="flex items-start mb-6">
                <div className="grow mr-10">
                    <h2 className="text-lg font-medium mb-2 text-default-blue-80">{title}</h2>
                    <p className="font-medium text-default-blue-60">{author}</p>
                </div>
                <Tag label={tag} />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-sm text-typo-black">DOI: {doi}</p>
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 fill-default-blue-40">
                        <Document />
                        <Data />
                        <Video />
                        <Slides />
                        <Code />
                    </div>
                    <Badge variant={status} />
                </div>
            </div>
        </div>
    );
};

const Tag = ({ label }: any) => {
    return (
        <div className="rounded-full px-[14px] py-[6px] inline-block uppercase font-medium text-default-70 bg-default-blue-30">
            {label}
        </div>
    );
};

export default ResearchCard;
