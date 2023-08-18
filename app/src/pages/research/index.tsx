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

    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="container mx-auto mt-10">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-default-50 text-xl font-medium">&lt; Back</p>
                    <div className="flex gap-4">
                        <Pill isActive>
                            <Document className="fill-white" /> Paper
                        </Pill>
                        <Pill>
                            <Data /> Data
                        </Pill>
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
                        <p className="font-medium text-lg text-dark-blue-60 mb-4">CertiK</p>
                        <p className="text-sm text-default-100 mb-8">
                            <strong>DOI</strong> N/A
                        </p>
                        <h3 className="text-default-100 text-lg font-semibold mb-2">Abstract</h3>
                        <p className="text-default-100 text-sm text-justify">
                            Virtualization technology starts becoming more and more widespread in the embedded space.
                            The penalties incurred by standard software-based virtualization is pushing research towards
                            hardware-assisted solutions. Among the existing commercial off-the-shelf technologies for
                            secure virtualization, ARM TrustZone is attracting particular attention. However, it is
                            often seen with some skepticism due to the dual-OS limitation of existing state-of-the-art
                            solutions. This letter presents the implementation of a TrustZone-based hypervisor for
                            real-time embedded systems, which allows multiple RTOS partitions on the same hardware
                            platform. The results demonstrate that virtualization overhead is less than 2 percent for a
                            10 milliseconds guest-switching rate, and the system remains deterministic. This work goes
                            beyond related work by implementing a TrustZone-assisted solution that allows the execution
                            of an arbitrary number of guest OSes while providing the foundation to drive next generation
                            of secure virtualization solutions for resource-constrained embedded devices.
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
                isActive ? 'bg-[#0088A9] text-white' : ''
            }`}
        >
            {children}
        </div>
    );
};

export default Research;
