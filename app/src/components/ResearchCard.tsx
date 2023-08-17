import Badge from './Badge';
// icons
import Document from '../icons/Document';
import Data from '../icons/Data';
import Video from '../icons/Video';
import Slides from '../icons/Slides';
import Code from '../icons/Code';

interface ResearchCardProps {
    description: string;
    symbol: string;
    attributes: [];
}

const ResearchCard = ({ description: name, attributes }: ResearchCardProps) => {
    console.log(name, attributes);

    return (
        <div className="bg-white p-5 w-[800px] border rounded-lg">
            <div className="flex items-start mb-6">
                <div className="grow mr-10">
                    <h2 className="text-lg font-medium mb-2 text-dark-blue-80">{name || 'N/A'}</h2>
                    <p className="font-medium text-dark-blue-60">
                        {attributes?.find((attr: any) => attr.trait_type === 'Author')?.value || 'N/A'}
                    </p>
                </div>
                <Tag label={attributes?.find((attr: any) => attr.trait_type === 'Access')?.value || 'N/A'} />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-sm text-default-100">
                    DOI: {attributes?.find((attr: any) => attr.trait_type === 'DOI')?.value || 'N/A'}
                </p>
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 fill-dark-blue-40">
                        <Document />
                        <Data />
                        <Video />
                        <Slides />
                        <Code />
                    </div>
                    <Badge
                        variant={attributes?.find((attr: any) => attr.trait_type === 'State')?.value || 'To Review'}
                    />
                </div>
            </div>
        </div>
    );
};

const Tag = ({ label }: any) => {
    return (
        <div className="rounded-full px-[14px] py-[6px] inline-block uppercase font-medium text-default-70 bg-dark-blue-30">
            {label}
        </div>
    );
};

export default ResearchCard;
