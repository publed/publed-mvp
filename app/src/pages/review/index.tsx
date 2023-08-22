// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import { useEffect, useState } from 'react';

import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import fs from 'fs';

// TYPES
const QUICKNODE_RPC =
    'https://ultra-light-model.solana-devnet.discover.quiknode.pro/9d539cf5480e146dc1c4452013b422c5e78e60af/';

type Email = string;
type StringPubKey = string;
type Destination = Email | StringPubKey;

interface NftMetadata {
    name: string;
    image: string;
    description: string;
    attributes: { trait_type: string; value: string }[];
    properties: {
        files: { uri: string; type: string }[];
        category: string;
    };
}

interface MintNftProps {
    destination: Destination;
    qnEndpoint: string;
    collectionId: string;
    nftInfo: NftMetadata;
}

interface FetchMintProps {
    qnEndpoint: string;
    collectionId: string;
    crossmintId: string;
}

interface MintResult {
    destination: string;
    crossmintId: string;
    mint: string;
}

const Upload = () => {
    const COLLECTION_ID = 'default-solana';
    const DROP_LIST: Destination[] = ['8U34qHx55Bk71JwQ67XLqFaawSz9oHfAy5jCfLDdhvtP'];
    const DELAY = 1000;

    const [strengths, setStrengths] = useState('');
    const [weaknesses, setWeaknesses] = useState('');
    const [observations, setObservations] = useState('');

    async function wait(ms: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    const requestCrossMintNft = async ({ destination, qnEndpoint, collectionId, nftInfo }: MintNftProps) => {
        let recipient: string;

        recipient = `solana:${new PublicKey(destination)}`;

        // Assemble POST Request
        const metadata = {
            name: nftInfo.name,
            image: nftInfo.image,
            description: nftInfo.description,
        };
        const data = {
            jsonrpc: '2.0',
            id: 1,
            method: 'cm_mintNFT',
            params: [collectionId, recipient, metadata], // https://docs.crossmint.com/docs/cm-mintnft
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return new Promise<string>(async (resolve, reject) => {
            try {
                let response = await axios.post(qnEndpoint, data, config);
                resolve(response.data.result.id as string);
            } catch (error) {
                reject('Error sending request to CrossMint. Check your inputs.');
            }
        });
    };

    const fetchMintAddress = async ({ collectionId, qnEndpoint, crossmintId }: FetchMintProps) => {
        const data = {
            jsonrpc: '2.0',
            id: 1,
            method: 'cm_getNFTMintStatus',
            params: [collectionId, crossmintId],
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return new Promise<string>(async (resolve, _reject) => {
            try {
                let response = await axios.post(qnEndpoint, data, config);
                resolve(response.data.result.onChain.mintHash as string);
            } catch (error) {
                //reject("Error fetching mint address.");
            }
        });
    };

    const dropNfts = async (dropList: Destination[], qnEndpoint: string, collectionId: string) => {
        let promises = dropList.map((drop, i) => {
            const nftInfo = {
                name: `Review #2`,
                image: 'https://arweave.net/AKn0ABY3iGwqBGYWILTSg3WudVq4ByYjGKqi1Z1aI60?ext=png',
                description: 'Review of Research Object X',
                attributes: [
                    {
                        trait_type: 'strenghts',
                        value: strengths,
                    },
                    {
                        trait_type: 'weaknesses',
                        value: weaknesses,
                    },
                    {
                        trait_type: 'observations',
                        value: observations,
                    },
                ],
                properties: {
                    files: [
                        {
                            uri: 'https://arweave.net/AKn0ABY3iGwqBGYWILTSg3WudVq4ByYjGKqi1Z1aI60?ext=png',
                            type: 'image/png',
                        },
                    ],
                    category: 'image',
                },
            };
            // 2-Create Promise
            return new Promise<MintResult>(async (resolve, reject) => {
                setTimeout(async () => {
                    try {
                        let crossmintId = await requestCrossMintNft({
                            destination: drop,
                            qnEndpoint,
                            collectionId,
                            nftInfo,
                        });
                        if (!crossmintId) throw new Error('No CrossMint ID received.');
                        await wait(60000); // wait 1 min
                        let mint = await fetchMintAddress({
                            collectionId,
                            qnEndpoint,
                            crossmintId,
                        });
                        resolve({
                            destination: drop,
                            crossmintId: crossmintId,
                            mint: mint ?? '',
                        });
                    } catch (error) {
                        reject('Unknown Error sending request to CrossMint.');
                    }
                }, i * DELAY);
            });
        });
        // 3-Execute Promises
        console.log('Executing promises...(this will take 1min +)');
        let results = await Promise.allSettled(promises);
        console.log(results);
    };

    const handleReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            strengths: data.get('strengths'),
            weaknesses: data.get('weaknesses'),
            observations: data.get('observations'),
        });

        setStrengths(data.get('strengths') as string);
        setWeaknesses(data.get('weaknesses') as string);
        setObservations(data.get('observations') as string);

        console.log('Creating Review:');

        await dropNfts(DROP_LIST, QUICKNODE_RPC, COLLECTION_ID);
    };
    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="w-[800px] mx-auto mt-10">
                <h1 className="text-default-100 text-4xl font-medium mb-12">Review Process</h1>
                <form className="grid grid-cols-1 grid-flow-row gap-5 mb-12" onSubmit={handleReview}>
                    <InputGroup label={'Strengths'}>
                        <Textarea name="strengths" placeholder="Enter strengths" />
                    </InputGroup>
                    <InputGroup label={'Weaknesses'}>
                        <Textarea name="weaknesses" placeholder="Enter weaknesses" />
                    </InputGroup>
                    <InputGroup label={'Observations'}>
                        <Textarea name="observations" placeholder="Enter observations" />
                    </InputGroup>
                    <InputGroup label={'State'} className="w-60">
                        <Select
                            options={['Accepted, Rejected, Minor Review, Major Review']}
                            placeholder="State"
                            selected="-1"
                            getOptionLabel={() => ''}
                            changeHandler={() => {}}
                        />
                    </InputGroup>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="light"
                            onClick={() => {
                                dropNfts(DROP_LIST, QUICKNODE_RPC, COLLECTION_ID);
                            }}
                        >
                            Mint NFT
                        </Button>
                        <Button variant="blue" onClick={() => {}}>
                            Submit Review
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Radio = ({ label, name, value }: any) => {
    return (
        <div className="flex items-center gap-3">
            <input className="form-ring text-dark-blue-60 bg-white" type="radio" name={name} id={value} value={value} />
            <label htmlFor={value} className="text-default-100">
                {label}
            </label>
        </div>
    );
};

const RadioGroup = ({ label, children }: any) => {
    console.log(children);
    return (
        <div className="flex flex-col gap-2">
            <span className="text-default-100 block font-medium text-lg mb-1">{label}</span>
            {children}
        </div>
    );
};

const InputGroup = ({ label, className, children }: any) => {
    return (
        <label className={`block text-left ${className}`}>
            <span className="text-default-100 block font-medium text-lg mb-3">{label}</span>
            {children}
        </label>
    );
};

export default Upload;
