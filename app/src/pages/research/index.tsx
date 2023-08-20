// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import { useParams } from 'react-router-dom';
import { MetaplexContext } from '../../context/MetaplexContext';
import { createContext, useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { JsonMetadata } from '@metaplex-foundation/js';
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
import ReactPlayer from 'react-player';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

const Research = () => {
    const { mx } = useContext(MetaplexContext);
    const { address } = useParams();
    const [researchObject, setResearchObject] = useState<JsonMetadata | null>(null);
    const [paper, setPaper] = useState<string>('');

    useEffect(() => {
        const fetchROData = async () => {
            console.log('hello: ', address);

            if (address) {
                const res = await mx.nfts().findByMint({ mintAddress: new PublicKey(address) });
                console.log(res);

                setResearchObject(res.json);
                if (res?.json?.properties?.files) setPaper(res?.json?.properties?.files[1].uri as string);
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
                    <Tabsx
                        chosen="docs"
                        renderNav={(selected: any) => (
                            <>
                                {researchObject?.properties?.files?.find(
                                    (attr: any) => attr.type === 'application/pdf'
                                ) ? (
                                    <NavItem id="docs">
                                        <Document className="" /> {selected === 'docs' && 'Paper'}
                                    </NavItem>
                                ) : null}
                                {researchObject?.properties?.files?.find(
                                    (attr: any) => attr.type === 'application/db'
                                ) ? (
                                    <NavItem id="data">
                                        <Data className="" /> {selected === 'data' && 'Data'}
                                    </NavItem>
                                ) : null}
                                {researchObject?.properties?.files?.find((attr: any) => attr.type === 'movie/mp4') ? (
                                    <NavItem id="video">
                                        <Video className="" /> {selected === 'video' && 'Video'}
                                    </NavItem>
                                ) : null}
                                {researchObject?.properties?.files?.find(
                                    (attr: any) => attr.type === 'application/pptx'
                                ) ? (
                                    <NavItem id="slides">
                                        <Slides className="" /> {selected === 'slides' && 'Slides'}
                                    </NavItem>
                                ) : null}
                                {researchObject?.properties?.files?.find((attr: any) => attr.type === 'code') ? (
                                    <NavItem id="code">
                                        <Code className="" /> {selected === 'code' && 'Code'}
                                    </NavItem>
                                ) : null}
                            </>
                        )}
                        renderPanels={(selected: any) => (
                            <div className="w-full mb-16">
                                <Panel id="docs">
                                    <div className="w-[770px] h-[448px] rounded-sm">
                                        {researchObject?.properties?.files?.find(
                                            (file) => file.type === 'application/pdf'
                                        ) && (
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                <Viewer
                                                    fileUrl={
                                                        researchObject?.properties?.files?.find(
                                                            (file) => file.type === 'application/pdf'
                                                        )?.uri || ''
                                                    }
                                                />
                                            </Worker>
                                        )}
                                    </div>
                                </Panel>
                                <Panel id="data">
                                    <div className="bg-gray-400 w-[770px] h-[448px]"></div>
                                </Panel>
                                <Panel id="video">
                                    <div className="bg-white w-[770px] h-[448px] flex justify-center items-center">
                                        <ReactPlayer
                                            url={
                                                researchObject?.properties?.files?.find(
                                                    (file) => file.type === 'movie/mp4'
                                                )?.uri || ''
                                            }
                                            playing={true}
                                            controls={true}
                                            loop={true}
                                            muted={true}
                                            playsinline={true}
                                        />
                                    </div>
                                </Panel>
                                <Panel id="slides">
                                    <div className="w-[770px] h-[448px] rounded-sm">
                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                            <Viewer
                                                fileUrl={
                                                    researchObject?.properties?.files?.find(
                                                        (file) => file.type === 'application/pptx'
                                                    )?.uri || ''
                                                }
                                            />
                                        </Worker>
                                    </div>
                                </Panel>
                                <Panel id="code">
                                    <div className="bg-gray-400 w-[670px] h-[448px]"></div>
                                </Panel>
                            </div>
                        )}
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-2 text-dark-blue-80">Reviews</h2>
                    <hr className="h-0.5 border-t-0 bg-gray-200 opacity-100" />
                    <div className="flex flex-row gap-10 mt-10">
                        <div className="block max-w-[18rem] rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="p-6">
                                <h5 className="mb-1 text-xl font-medium leading-tight text-neutral-800 ">Review 1</h5>
                                <h6 className="mb-2 text-base font-medium leading-tight text-neutral-500 ">
                                    Reviewer Name
                                </h6>
                                <p className="mb-4 text-base  leading-normal text-neutral-600 dark:text-neutral-200">
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </p>
                                <a
                                    type="button"
                                    href="#"
                                    className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                        <div className="block max-w-[18rem] rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="p-6">
                                <h5 className="mb-1 text-xl font-medium leading-tight text-neutral-800 ">Review 1</h5>
                                <h6 className="mb-2 text-base font-medium leading-tight text-neutral-500 ">
                                    Reviewer Name
                                </h6>
                                <p className="mb-4 text-base  leading-normal text-neutral-600 dark:text-neutral-200">
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </p>
                                <a
                                    type="button"
                                    href="#"
                                    className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                        <div className="block max-w-[18rem] rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="p-6">
                                <h5 className="mb-1 text-xl font-medium leading-tight text-neutral-800 ">Review 1</h5>
                                <h6 className="mb-2 text-base font-medium leading-tight text-neutral-500 ">
                                    Reviewer Name
                                </h6>
                                <p className="mb-4 text-base  leading-normal text-neutral-600 dark:text-neutral-200">
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </p>
                                <a
                                    type="button"
                                    href="#a"
                                    className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                        <div className="block max-w-[18rem] rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                            <div className="p-6">
                                <h5 className="mb-1 text-xl font-medium leading-tight text-neutral-800 ">Review 1</h5>
                                <h6 className="mb-2 text-base font-medium leading-tight text-neutral-500 ">
                                    Reviewer Name
                                </h6>
                                <p className="mb-4 text-base  leading-normal text-neutral-600 dark:text-neutral-200">
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </p>
                                <a
                                    type="button"
                                    href="#a"
                                    className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Pill = ({ children, id }: any) => {
    const [selected, setSelected] = useState('paper');
    console.log('selected: ', selected);

    return (
        <li
            className={`rounded-full px-5 py-[10px] inline-flex border border-dark-blue-30 uppercase bg-white font-medium text-default-70 gap-[10px] ${
                selected === id
                    ? 'bg-regular-blue-70 text-default-0 fill-default-0'
                    : 'bg-white text-default-70 stroke-default-70 fill-none px-[10px]'
            }`}
            onClick={() => setSelected(id)}
        >
            {children}
        </li>
    );
};

const tabsContext = createContext<[any, Function] | null>(null);

const useData = () => {
    const context = useContext(tabsContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const Tabsx = ({ chosen, renderNav, renderPanels }: any) => {
    const [selected, setSelected] = useState(chosen);

    return (
        <tabsContext.Provider value={[selected, setSelected]}>
            <div className="flex flex-col gap-4">
                <ul className="flex gap-4">{renderNav(selected)}</ul>
                <ul>{renderPanels(selected)}</ul>
            </div>
        </tabsContext.Provider>
    );
};

const NavItem = ({ id, children }: any) => {
    const [selected, setSelected] = useData();

    return (
        <li
            className={`flex gap-[6px] px-5 py-[10px] border rounded-full cursor-pointer ${
                selected == id
                    ? 'bg-regular-blue-70 text-default-0 fill-default-0'
                    : 'bg-white text-default-70 stroke-default-70 fill-none px-[10px]'
            }`}
            onClick={() => setSelected(id)}
        >
            {children}
        </li>
    );
};

const Panel = ({ id, children }: any) => {
    const [selected, setSelected] = useData();

    return <li className={selected == id ? 'block' : 'hidden'}>{children}</li>;
};

export default Research;
