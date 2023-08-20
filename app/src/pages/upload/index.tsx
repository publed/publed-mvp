import React, { useState, useEffect, useContext } from 'react';
import Select from '../../components/Select';
// icons
import Document from '../../icons/Document';
import Data from '../../icons/Data';
import Video from '../../icons/Video';
import Slides from '../../icons/Slides';
import Code from '../../icons/Code';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';
import { MetaplexContext } from '../../context/MetaplexContext';

const NFTmint = async (
    title: string,
    authorName: string,
    date: string,
    DOI: string,
    abstract: string,
    state: string,
    access: string,
    pdf: string,
    image: string,
    video: string
) => {
    const { mx } = useContext(MetaplexContext);

    const { uri } = await mx.nfts().uploadMetadata({
        name: 'BAO #RO',
        symbol: 'BAO',
        description: 'BAO - A Lightweight Static Partitioning Hypervisor',
        seller_fee_basis_points: 500,
        image: image,
        external_url: 'http://www.bao-project.org/',
        collection: {
            name: 'BAO',
            family: 'BAO #RO',
        },
        attributes: [
            {
                trait_type: 'Author',
                value: authorName,
            },
            { trait_type: 'Date', value: date },
            { trait_type: 'DOI', value: DOI },
            {
                trait_type: 'Abstract',
                value: abstract,
            },
            { trait_type: 'State', value: state },
            { trait_type: 'Access', value: access },
        ],
        properties: {
            creators: [
                {
                    //@ts-ignore
                    address: wallet?.publicKey.toString(),
                    share: 100,
                },
            ],
            files: [
                {
                    uri: image,
                    type: 'image/png',
                },
                {
                    uri: pdf,
                    type: 'application/pdf',
                },
                {
                    uri: video,
                    type: 'movie/mp4',
                },
            ],
        },
    });

    console.log(uri);
};

const emptyForm = {
    title: '',
    author: '',
    month: '',
    year: '',
    doi: '',
    abstract: '',
    state: '',
    access: '',
    docs: '',
    data: '',
    video: '',
    slides: '',
    code: '',
};

const Upload = () => {
    const [form, setForm] = useState(emptyForm);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };
    const handleFileChange = (event: any) => {
        const { name, files } = event.target;
        setForm({ ...form, [name]: files[0] });
    };

    const handleMint = () => {
        const { title, author, month, year, doi, abstract, state, access, docs, data, video, slides, code } = form;
        const date = `${month} ${year}`;
        NFTmint(title, author, date, doi, abstract, state, access, docs, slides, video);
    };

    useEffect(() => {
        console.log(form);
    }, [form]);

    const months = [
        { value: 'jan', label: 'January' },
        { value: 'feb', label: 'February' },
        { value: 'mar', label: 'March' },
        { value: 'apr', label: 'April' },
        { value: 'may', label: 'May' },
        { value: 'jun', label: 'June' },
        { value: 'jul', label: 'July' },
        { value: 'aug', label: 'August' },
        { value: 'sep', label: 'September' },
        { value: 'oct', label: 'October' },
        { value: 'nov', label: 'November' },
        { value: 'dec', label: 'December' },
    ];

    const currentYear = new Date().getFullYear();
    const last100Years = Array.from(Array(currentYear - 1900 + 1).keys()).map((year) => {
        return { value: currentYear - year, label: currentYear - year };
    });

    return (
        <div className="min-h-screen w-full py-20 bg-background-grey">
            <div className="w-[400px] mx-auto mt-10">
                <h1 className="text-default-100 text-4xl font-medium mb-12">You can upload your research object!</h1>
                <h2 className="text-default-70 text-2xl font-semibold mb-6">Research Object Info</h2>
                <div className="grid grid-cols-1 grid-flow-row gap-5 mb-12">
                    <InputGroup label={'Research Object Name'}>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Name - e.g: A comprehensive Study..."
                            changeHandler={handleInputChange}
                        />
                    </InputGroup>
                    <InputGroup label={'Author Name'}>
                        <Input
                            type="text"
                            name="author"
                            placeholder="Author name(s)"
                            changeHandler={handleInputChange}
                        />
                    </InputGroup>
                    <InputGroup label={'Date'}>
                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                options={months}
                                getOptionLabel={(item) => item.label}
                                changeHandler={({ value }) =>
                                    handleInputChange({ target: { name: 'month', value: value } })
                                }
                                selected="-1"
                                placeholder="Month"
                            />
                            <Select
                                options={last100Years}
                                getOptionLabel={(item) => item.label}
                                changeHandler={({ value }) =>
                                    handleInputChange({ target: { name: 'year', value: value } })
                                }
                                selected="-1"
                                placeholder="Year"
                            />
                        </div>
                    </InputGroup>
                    <InputGroup label={'DOI'}>
                        <Input type="text" name="doi" placeholder="DOI" changeHandler={handleInputChange} />
                    </InputGroup>
                    <InputGroup label={'Abstract'}>
                        <Textarea name="abstract" placeholder="Enter an abstract" changeHandler={handleInputChange} />
                    </InputGroup>
                    <RadioGroup label={'State'}>
                        <Radio label={'Reviewed'} name={'state'} value={'reviewed'} onChange={handleInputChange} />
                        <Radio label={'Pending'} name={'state'} value={'pending'} onChange={handleInputChange} />
                    </RadioGroup>
                    <RadioGroup label={'Access'}>
                        <Radio label={'Free'} name={'access'} value={'free'} onChange={handleInputChange} />
                        <Radio label={'Premium'} name={'access'} value={'premium'} onChange={handleInputChange} />
                    </RadioGroup>
                </div>

                <h2 className="text-default-70 text-2xl font-semibold mb-6">Upload Research Object</h2>
                <p className="text-lg font-medium text-default-100 mb-4">Choose file type</p>
                <Tabsx
                    chosen="docs"
                    renderNav={(selected: any) => (
                        <>
                            <NavItem id="docs">
                                <Document className="" /> {selected === 'docs' && 'Paper'}
                            </NavItem>
                            <NavItem id="data">
                                <Data className="" /> {selected === 'data' && 'Data'}
                            </NavItem>
                            <NavItem id="video">
                                <Video className="" /> {selected === 'video' && 'Video'}
                            </NavItem>
                            <NavItem id="slides">
                                <Slides className="" /> {selected === 'slides' && 'Slides'}
                            </NavItem>
                            <NavItem id="code">
                                <Code className="" /> {selected === 'code' && 'Code'}
                            </NavItem>
                        </>
                    )}
                    renderPanels={(selected: any) => (
                        <div className="w-full mb-16">
                            <Panel id="docs">
                                <FileUpload name="docs" onChange={handleFileChange} />
                            </Panel>
                            <Panel id="data">
                                <FileUpload name="data" onChange={handleFileChange} />
                            </Panel>
                            <Panel id="video">
                                <FileUpload name="video" onChange={handleFileChange} />
                            </Panel>
                            <Panel id="slides">
                                <FileUpload name="slides" onChange={handleFileChange} />
                            </Panel>
                            <Panel id="code">
                                <FileUpload name="code" onChange={handleFileChange} />
                            </Panel>
                            {/* <div className="">
                                {form?.docs && (
                                    <FileEntry icon={<Document className="w-8 h-8" />} name={form.docs?.name} />
                                )}
                                {form?.data && <FileEntry icon={<Data className="w-8 h-8" />} name={form.data?.name} />}
                                {form?.video && (
                                    <FileEntry icon={<Video className="w-8 h-8" />} name={form.video?.name} />
                                )}
                                {form?.slides && (
                                    <FileEntry icon={<Slides className="w-8 h-8" />} name={form.slides?.name} />
                                )}
                                {form?.code && <FileEntry icon={<Code className="w-8 h-8" />} name={form.code?.name} />}
                            </div> */}
                        </div>
                    )}
                />
                <div className="flex gap-3 justify-between">
                    <Button variant="light" onClick={() => {}}>
                        Mint NFT
                    </Button>
                    <Button variant="blue" onClick={() => {}}>
                        Publish on Publed
                    </Button>
                </div>
            </div>
        </div>
    );
};

const FileEntry = ({ icon, name }: any) => {
    return (
        <div className="flex items-center gap-3">
            {icon}
            <span className="text-default-100">{name}</span>
        </div>
    );
};

const FileUpload = ({ name, onChange }: any) => {
    return (
        <label className="flex flex-col items-center justify-center bg-default-0 border border-default-30 rounded-lg w-full h-32 cursor-pointer border-dashed">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                </p>
            </div>
            <input type="file" name={name} className="hidden" onChange={onChange} />
        </label>
    );
};

const tabsContext = React.createContext<[any, Function] | null>(null);

const useData = () => {
    const context = React.useContext(tabsContext);
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

const Radio = ({ label, name, value, onChange }: any) => {
    return (
        <div className="flex items-center gap-3">
            <input
                className="form-ring text-dark-blue-60 bg-white"
                type="radio"
                name={name}
                id={value}
                value={value}
                onChange={onChange}
            />
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

const InputGroup = ({ label, children }: any) => {
    return (
        <label className="block text-left">
            <span className="text-default-100 block font-medium text-lg mb-3">{label}</span>
            {children}
        </label>
    );
};

export default Upload;
