// import { useWallet } from '@solana/wallet-adapter-react';
// import ResearchCard from '../../components/ResearchCard';
// import { useContext, useEffect, useState } from 'react';
// import { MetaplexContext } from '../../context/MetaplexContext';
// import { PublicKey, walletAdapterIdentity } from '@metaplex-foundation/js';
// import { PubledContext } from '../../context/PubledContext';
// import { Link } from 'react-router-dom';

// const Explore = () => {
//     const { mx } = useContext(MetaplexContext);
//     //@ts-ignore
//     const { posts } = useContext(PubledContext);

//     const [researchObject, setResearchObject] = useState();
//     console.log(researchObject);

//     const wallet = useWallet();
//     mx.use(walletAdapterIdentity(wallet));

//     const postsList = async () => {
//         const filteredContents = posts
//             .filter((post: any) => post.account.content.length > 12)
//             .map((post: any) => post.account.content);

//         console.log(filteredContents);
//         const fetchNFTData = async (mintAddress: string) => {
//             const res = await mx.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) });
//             return { json: res.json, address: res.address.toString() };
//         };

//         const nftDataArray = await Promise.all(filteredContents.map(fetchNFTData));

//         setResearchObject(nftDataArray);
//         console.log(nftDataArray);
//     };

//     useEffect(() => {
//         postsList();
//     }, [posts]);

//     return (
//         <div className="min-h-screen w-full py-20 bg-background-grey">
//             <div className="w-[800px] mx-auto mt-10">
//                 <div className="mb-8 space-x-2">
//                     <Pill label="All" isActive />
//                     <Pill label="Free" />
//                     <Pill label="Premium" />
//                 </div>
//                 <div className="space-y-4">
//                     {/* @ts-ignore */}
//                     {data?.map((item, index) => (
//                         // <Link to={`/research/${item.address}`} key={index}>
//                         <ResearchCard key={index} {...item} />
//                         // </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Pill = ({ label, isActive }: any) => {
//     return (
//         <div
//             className={`rounded-full px-5 py-[10px] inline-block border border-dark-blue-30 uppercase bg-white font-medium text-default-80 ${
//                 isActive ? 'bg-dark-blue-30' : ''
//             }`}
//         >
//             {label}
//         </div>
//     );
// };

// // three random paper entries
// const data = [
//     {
//         title: 'CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems',
//         author: 'CertiK',
//         tag: 'Free',
//         doi: 'N/A',
//         status: 'success',
//     },
//     {
//         title: 'CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems',
//         author: 'CertiK',
//         tag: 'Premium',
//         doi: 'N/A',
//         status: 'pending',
//     },
//     {
//         title: 'CertiK: Building Fully Trustworthy Smart Contracts and Blockchain Ecosystems',
//         author: 'CertiK',
//         tag: 'Free',
//         doi: 'N/A',
//         status: 'rejected',
//     },
// ];

// export default Explore;
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
                        //@ts-ignore
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
        title: 'Solana: A new architecture for a high performance blockchain',
        author: 'Anatoly Yakovenko',
        tag: 'Free',
        doi: 'N/A',
        status: 'success',
    },
    {
        title: 'Bitcoin: A Peer-to-Peer Electronic Cash System',
        author: 'Satoshi Nakamoto',
        tag: 'Free',
        doi: 'N/A',
        status: 'success',
    },
    {
        title: 'Bao: A Lightweight Static Partitioning Hypervisor for Modern Multi-Core Embedded Systems',
        author: 'José Martins, Adriano Tavares, Marco Solieri, Marko Bertogna, Sandro Pinto',
        tag: 'Free',
        doi: '10.4230/OASIcs.NG-RES.2020.3',
        status: 'success',
    },
    {
        title: 'A framework for scheduling DRAM memory accesses for multi-core mixed-time critical systems',
        author: 'Mohamed Hassan, Hiren Patel, Rodolfo Pellizzoni',
        tag: 'Free',
        doi: '10.1109/RTAS.2015.7108454',
        status: 'success',
    },
];

export default Explore;
