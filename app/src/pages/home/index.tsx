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
import Avatar from 'boring-avatars';

export const getAvatarUrl = (key: string) => {
    return `https://source.boringavatars.com/pixel/120/${key}?colors=26a653,2a1d8f,79646a,e9c46a,e76f51,264653`;
};

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState<MetaplexFile>();
    const [pdf, setPDF] = useState<MetaplexFile>();
    const [video, setVideo] = useState<MetaplexFile>();
    const [ppt, setPPT] = useState<MetaplexFile>();

    const wallet = useWallet();
    const metaplexConnection = new Connection(clusterApiUrl('devnet'));

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
    if (wallet.publicKey) console.log('avatar: ', getAvatarUrl(wallet.publicKey?.toString()));

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

        const { uri } = await mx.nfts().uploadMetadata({
            name: 'MCX #RO',
            symbol: 'MCX',
            description: 'MCXplore: An automated framework for validating memory controller designs',
            seller_fee_basis_points: 500,
            image: imageFile,
            external_url: 'https://gitlab.com/FanosLab/mcxplore',
            collection: { name: 'MCX', family: 'MCX #RO' },
            attributes: [
                { trait_type: 'Author', value: 'Mohamed Hassan, Hiren Patel' },
                { trait_type: 'Date', value: 'Mar 2016' },
                { trait_type: 'DOI', value: '978-3-9815370-7-9/DATE16/c2016EDAA' },
                {
                    trait_type: 'Abstract',
                    value: 'This work presents an automated framework for the validation of dynamic random access memory controllers (DRAM MCs) called MCXplore. In developing this framework, we construct formal models for memory requests interrelation and DRAM command interaction. The framework enables validation engineers to define their test plans precisely as temporal logic specifications. We use the NuSMV model-checker to generate counter-examples that serve as test templates; hence, MCXplore uses these test templates to generate memory tests to validate the correctness properties of the memory controller. We show the effectiveness of MCXplore by validating various state-of-the-art MC features as well as hard-to-detect timing violations that often occur. We also provide a set of predefined test plans, and regression tests that validate essential properties of modern DRAM MCs. We release MCXplore as an open-source framework to allow validation engineers and researchers to extend and use.',
                },
                { trait_type: 'State', value: 'Reviewed' },
                { trait_type: 'Access', value: 'Free' },
            ],
            properties: {
                creators: [
                    {
                        address: '8U34qHx55Bk71JwQ67XLqFaawSz9oHfAy5jCfLDdhvtP',
                        share: 100,
                    },
                ],
                files: [
                    {
                        uri: imageFile,
                        type: 'image/png',
                    },
                    {
                        uri: pdf,
                        type: 'application/pdf',
                    },
                    // {
                    //     uri: video,
                    //     type: 'movie/mp4',
                    // },
                    {
                        uri: ppt,
                        type: 'application/pptx',
                    },
                ],
            },
        });

        console.log(uri);

        const { nft } = await mx.nfts().create(
            {
                name: 'SOL #RO',
                uri: uri,
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
