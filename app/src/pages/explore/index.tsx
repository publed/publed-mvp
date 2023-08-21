import { useWallet } from '@solana/wallet-adapter-react';
import ResearchCard from '../../components/ResearchCard';
import { useContext, useEffect, useState } from 'react';
import { MetaplexContext } from '../../context/MetaplexContext';
import { PublicKey, walletAdapterIdentity } from '@metaplex-foundation/js';
import { PubledContext } from '../../context/PubledContext';
import { Link } from 'react-router-dom';

const Explore = () => {
    const { mx } = useContext(MetaplexContext);
    //@ts-ignore
    const { posts } = useContext(PubledContext);

    const [researchObject, setResearchObject] = useState<any[]>();
    console.log(researchObject);

    const wallet = useWallet();
    mx.use(walletAdapterIdentity(wallet));

    const postsList = async () => {
        if (posts) {
            const filteredContents = posts
                .filter((post: any) => post.account.content.length > 12)
                .map((post: any) => post.account.content);

            console.log(filteredContents);
            const fetchNFTData = async (mintAddress: string) => {
                const res = await mx.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) });
                return { json: res.json, address: res.address.toString() };
            };

            const nftDataArray = await Promise.all(filteredContents.map(fetchNFTData));

            setResearchObject(nftDataArray);
            console.log(nftDataArray);
        }
    };

    useEffect(() => {
        postsList();
    }, [posts]);

    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="w-[800px] mx-auto mt-10">
                <div className="mb-8 space-x-2">
                    <Pill label="All" isActive />
                    <Pill label="Free" />
                    <Pill label="Premium" />
                </div>
                <div className="space-y-4">
                    {/* @ts-ignore */}
                    {researchObject?.map((item, index) => (
                        <div className="space-y-4">
                            <Link to={`/research/${item.address}`} key={index}>
                                <ResearchCard key={index} {...item.json} />
                            </Link>
                        </div>
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

export default Explore;
