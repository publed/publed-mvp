import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import { useEffect } from 'react';
import FormComponent from '../../components/Form';
import { Input, InputGroup } from '../signup';
import { actions } from '@metaplex/js';
import { Metaplex, bundlrStorage, keypairIdentity, walletAdapterIdentity } from '@metaplex-foundation/js';

const Home = () => {
    const wallet = useWallet();
    const metaplexConnection = new Connection(clusterApiUrl('devnet'));
    const mx = Metaplex.make(metaplexConnection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage({ address: 'https://devnet.bundlr.network' }));
    console.log('MX:', mx);

    const { connection } = useConnection();

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

    const NFTmint = async () => {
        //     const mintNftResponse = await actions.mintNFT({
        //         connection,
        //         wallet: wallet, // It need to match your wallet and creators address of Metadata.
        //         uri: 'https://arweave.net/_b2WhU6c7tHqYUsk4sVEChNITesTnGSSw7SQix2fEw8l',
        //         maxSupply: 1,
        //     });

        // setSolTransactionId(mintNftResponse.mint.toString());
        //     console.log('mint =>', mintNftResponse.mint.toString());

        // const { nft } = await mx.nfts().create({
        //     uri: 'https://n3p6rezfrxbhtmi7cpxeimirgwwm6jwjp3wk32e6ohfssfhom67a.arweave.net/bt_okyWNwnmxHxPuRDERNazPJsl-7K3onnHLKRTuZ74',
        //     name: 'My NFT',
        //     sellerFeeBasisPoints: 500, // Represents 5.00%.
        // });
        // const { uri: newUri } = await mx.nfts().uploadMetadata({
        //     name: 'My Updated Metadata Name',
        //     description: 'My Updated Metadata Description',
        // });

        const { uri } = await mx.nfts().uploadMetadata({
            name: 'valueName',
            symbol: 'valueSymbol',
            description: 'valueDescription',
            seller_fee_basis_points: 500,
            image: 'valueImage',
            external_url: 'valueExternalUrl',
            collection: {
                name: 'valueCollectionName',
                family: 'valueCollectionFamily',
            },
            attributes: {
                trait_type: 'Date',
                value: 'Jan 2020',
            },
            properties: {
                creators: [
                    {
                        address: 'user.authority.toString()',
                        share: 100,
                    },
                ],
            },
        });

        console.log(uri);

        const { nft } = await mx.nfts().create(
            {
                name: 'First NFT',
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
            <button onClick={NFTmint}>mint</button>
        </div>
    );
};

export default Home;
