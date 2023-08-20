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

        const { uri } = await mx.nfts().uploadMetadata({
            name: 'BAO #RO',
            symbol: 'BAO',
            description: 'BAO - A Lightweight Static Partitioning Hypervisor',
            seller_fee_basis_points: 500,
            image: 'https://arweave.net/6rrbLMO2pAwKHUuYBjCCPoMXSJDgmG--e4IT8tllvMk',
            external_url: 'http://www.bao-project.org/',
            collection: {
                name: 'BAO',
                family: 'BAO #RO',
            },
            attributes: [
                {
                    trait_type: 'Author',
                    value: 'José Martins, Adriano Tavares, Marco Solieri, Marko Bertogna, Sandro Pinto',
                },
                {
                    trait_type: 'Date',
                    value: 'Jan 2020',
                },
                {
                    trait_type: 'DOI',
                    value: '10.4230/OASIcs.NG-RES.2020.3',
                },
                {
                    trait_type: 'Abstract',
                    value: 'Given the increasingly complex and mixed-criticality nature of modern embedded systems, virtualiz-ation emerges as a natural solution to achieve strong spatial and temporal isolation. Widely used hypervisors such as KVM and Xen were not designed having embedded constraints and requirements in mind. The static partitioning architecture pioneered by Jailhouse seems to address embedded concerns. However, Jailhouse still depends on Linux to boot and manage its VMs. In this paper, we present the Bao hypervisor, a minimal, standalone and clean-slate implementation of the static partitioning architecture for Armv8 and RISC-V platforms. Preliminary results regarding size, boot, performance, and interrupt latency, show this approach incurs only minimal virtualization overhead. Bao will soon be publicly available, in hopes of engaging both industry and academia on improving Baos safety, security, and real-time guarantees.',
                },
                {
                    trait_type: 'State',
                    value: 'Reviewed',
                },
                {
                    trait_type: 'Access',
                    value: 'Premium',
                },
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
                        uri: 'https://arweave.net/mL4lFAltoarGWdNYP19t76OsdLwp49O8eiLbjDZjcmM',
                        type: 'image/png',
                    },
                    {
                        uri: 'https://arweave.net/uyyPUzZyE6tGXz9o4rCHAjhpJQBNaTWvIetHeiwcdak',
                        type: 'application/pdf',
                    },
                    {
                        uri: 'https://arweave.net/HvEjoAzhukOehNLsJh1OcmL5FYYCFJn3RiHa-Xzhslw',
                        type: 'movie/mp4',
                    },
                    {
                        uri: 'https://arweave.net/upxeDYlMl0HMTDzjF6FIqqN8qUfbHVRlV8E3hdhoGlc',
                        type: 'application/pptx',
                    },
                ],
            },
        });

        console.log(uri);

        const { nft } = await mx.nfts().create(
            {
                name: 'BAO #RO',
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
