// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import { useParams } from 'react-router-dom';
import { MetaplexContext } from '../../context/MetaplexContext';
import { useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { JsonMetadata } from '@metaplex-foundation/js';

const Research = () => {
    const { mx } = useContext(MetaplexContext);
    const { address } = useParams();
    const [researchObject, setResearchObject] = useState<JsonMetadata | null>(null);

    useEffect(() => {
        const fetchROData = async () => {
            console.log('hello: ', address);

            if (address) {
                const res = await mx.nfts().findByMint({ mintAddress: new PublicKey(address) });
                console.log(res);

                setResearchObject(res.json);
            }
        };
        fetchROData();
    }, []);

    console.log('RO: ', researchObject?.properties?.files);

    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="container mx-auto mt-10">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-default-50 text-xl font-medium">&lt; Back</p>
                    <div className="flex gap-4">
                        {researchObject?.properties?.files?.find((attr: any) => attr.type === 'application/pdf')
                            ?.value || 'N/A' ? (
                            <Pill isActive>
                                <Document /> Paper
                            </Pill>
                        ) : null}
                        {researchObject?.properties?.files?.find((attr: any) => attr.type === 'application/db')
                            ?.value || 'N/A' ? (
                            <Pill>
                                <Data /> Data
                            </Pill>
                        ) : null}
                        <Pill>
                            <Video />
                            Video
                        </Pill>
                        <Pill>
                            <Slides />
                            Pitch
                        </Pill>
                        <Pill>
                            <Code /> Code
                        </Pill>
                    </div>
                </div>
                <div className="flex justify-between gap-16">
                    <div className="max-w-lg">
                        <h2 className="text-2xl font-semibold mb-2 text-dark-blue-80">{researchObject?.description}</h2>
                        {researchObject?.attributes?.find((attr: any) => attr.trait_type === 'Author')?.value || 'N/A'}
                        <p className="font-medium text-lg text-dark-blue-60 mb-4"></p>
                        <p className="text-sm text-default-100 mb-8">
                            <strong>DOI</strong>{' '}
                            {researchObject?.attributes?.find((attr: any) => attr.trait_type === 'DOI')?.value || 'N/A'}
                        </p>
                        <h3 className="text-default-100 text-lg font-semibold mb-2">Abstract</h3>
                        <p className="text-default-100 text-sm text-justify">
                            {researchObject?.attributes?.find((attr: any) => attr.trait_type === 'Abstract')?.value ||
                                'N/A'}
                        </p>
                    </div>
                    <div className="bg-gray-400 w-[670px] h-[448px]" />
                </div>
            </div>
        </div>
    );
};

const Pill = ({ isActive, children }: any) => {
    return (
        <div
            className={`rounded-full px-5 py-[10px] inline-flex border border-dark-blue-30 uppercase bg-white font-medium text-default-70 gap-[10px] ${
                isActive ? 'bg-[#0088A9] text-red-600' : ''
            }`}
        >
            {children}
        </div>
    );
};

export default Research;
