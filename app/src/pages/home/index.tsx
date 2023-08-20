import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import { useContext, useEffect, useState } from 'react';
import FormComponent from '../../components/Form';
import Input from '../../components/Input';
import { InputGroup } from '../signup';
import {
    Metaplex,
    MetaplexFile,
    bundlrStorage,
    keypairIdentity,
    toMetaplexFile,
    toMetaplexFileFromBrowser,
    walletAdapterIdentity,
} from '@metaplex-foundation/js';
import base58, * as bs58 from 'bs58';

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState<MetaplexFile>();
    const [pdf, setPDF] = useState<MetaplexFile>();
    const [video, setVideo] = useState<MetaplexFile>();
    const [ppt, setPPT] = useState<MetaplexFile>();

    const wallet = useWallet();
    const metaplexConnection = new Connection(clusterApiUrl('devnet'));

    const walletP = Keypair.fromSecretKey(
        //8U34qHx55Bk71JwQ67XLqFaawSz9oHfAy5jCfLDdhvtP
        base58.decode('3eT2VjzqqgEkjqEiNvSQb941CMc5sDgDYANzaHLeJB9xcuuVTG3TRnxdpEJgTBctD1Gt7BE1ekBZRpQH9rqeoTVR')
    );
    const mx = Metaplex.make(metaplexConnection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage({ address: 'https://devnet.bundlr.network' }));
    // const mx = Metaplex.make(metaplexConnection)
    //     .use(keypairIdentity(walletP))
    //     .use(bundlrStorage({ address: 'https://devnet.bundlr.network' }));
    // console.log('MX:', mx);

    const { connection } = useConnection();
    // const { mx } = useContext(MetaplexContext);

    let lamportBalance: any;

    const getBalance = async () => {
        if (wallet?.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            lamportBalance = balance / LAMPORTS_PER_SOL;
            console.log(lamportBalance);
        }
    };

    useEffect(() => {
        getBalance();
    }, [wallet]);

    //@ts-ignore
    const handleImageChange = async (event) => {
        const browserFile: File = event.target.files[0];
        const file: MetaplexFile = await toMetaplexFileFromBrowser(browserFile);
        setImageFile(file);
    };
    //@ts-ignore
    const handlePDFChange = async (event) => {
        const browserFile: File = event.target.files[0];
        const file: MetaplexFile = await toMetaplexFileFromBrowser(browserFile);
        setPDF(file);
    };
    //@ts-ignore
    const handleVideoChange = async (event) => {
        const browserFile: File = event.target.files[0];
        const file: MetaplexFile = await toMetaplexFileFromBrowser(browserFile);
        setVideo(file);
    };
    //@ts-ignore
    const handlePPTChange = async (event) => {
        const browserFile: File = event.target.files[0];
        const file: MetaplexFile = await toMetaplexFileFromBrowser(browserFile);
        setPPT(file);
    };

    const NFTmint = async () => {
        // const imgMetaplexFile = toMetaplexFileFromBrowser(imageFile, 'fileName');
        // const uri = await mx.storage().upload(imageFile);

        // const { uri } = await mx.nfts().uploadMetadata({
        //     name: 'SOL #RO',
        //     symbol: 'SOL',
        //     description: 'Solana - A New Architecture for a High Performance Blockchain',
        //     seller_fee_basis_points: 500,
        //     image: imageFile,
        //     external_url: 'https://solana.com/',
        //     collection: {
        //         name: 'SOL',
        //         family: 'SOL #RO',
        //     },
        //     attributes: [
        //         {
        //             trait_type: 'Author',
        //             value: 'Anatoly Yakovenko',
        //         },
        //         { trait_type: 'Date', value: 'Nov 2020' },
        //         { trait_type: 'DOI', value: '' },
        //         {
        //             trait_type: 'Abstract',
        //             value: 'This paper proposes a new blockchain architecture based on Proof of History (PoH) - a proof for verifying order and passage of time between events. PoH is used to encode trustless passage of time into a ledger - an append only data structure. When used alongside a consensus algorithm such as Proof of Work (PoW) or Proof of Stake (PoS), PoH can reduce messaging overhead in a Byzantine Fault Tolerant replicated state machine, resulting inn sub-second finality times. This paper also proposes two algorithms that leverage the time keeping properties of the PoH ledger - a PoS algorithm that can recover from partitions of any size and an efficient streaming Proof of Replication (PoRep). The combination of PoRep and PoH provides a defense against forgery of the ledger with respect to time (ordering) and storage. The protocol is analyzed on a 1 gbps network, and this paper shows that throughput up to 710k transactions per second is possible with todays hardware.',
        //         },
        //         { trait_type: 'State', value: 'Reviewed' },
        //         { trait_type: 'Access', value: 'Free' },
        //     ],
        //     properties: {
        //         creators: [
        //             {
        //                 //@ts-ignore
        //                 address: wallet?.publicKey.toString(),
        //                 share: 100,
        //             },
        //         ],
        //         files: [
        //             {
        //                 uri: imageFile,
        //                 type: 'image/png',
        //             },
        //             {
        //                 uri: pdf,
        //                 type: 'application/pdf',
        //             },
        //             {
        //                 uri: video,
        //                 type: 'movie/mp4',
        //             },
        //             {
        //                 uri: ppt,
        //                 type: 'application/pdf',
        //             },
        //         ],
        //     },
        // });

        // console.log(uri);

        const { nft } = await mx.nfts().create(
            {
                name: 'SOL #RO',
                uri: 'https://arweave.net/pWhUy0TlvhxwMCgFLlX_izv7Qr1v2RNQyLY7tQd9n_k',
                sellerFeeBasisPoints: 500, // Represents 5.00%.
            },
            { commitment: 'finalized' }
        );

        console.log(nft.mint.address.toBase58());
    };

    return (
        <div className="flex justify-center h-screen items-center mx-auto">
            <InputGroup label={'Enter your name'}>
                <Input type="text" name="name" placeholder="Name"></Input>
            </InputGroup>
            <InputGroup label={'Enter your name'}>
                <Input type="text" name="name" placeholder="Name"></Input>
            </InputGroup>
            <input
                accept="/*"
                type="file"
                id="image-upload"
                name="image-upload"
                className=""
                onChange={handleImageChange}
            />
            <input
                accept="/*"
                type="file"
                id="image-upload"
                name="image-upload"
                className=""
                onChange={handlePDFChange}
            />
            <input
                accept="/*"
                type="file"
                id="image-upload"
                name="image-upload"
                className=""
                onChange={handleVideoChange}
            />
            <input
                accept="/*"
                type="file"
                id="image-upload"
                name="image-upload"
                className=""
                onChange={handlePPTChange}
            />
            <button onClick={NFTmint}>mint</button>
        </div>
    );
};

export default Home;
