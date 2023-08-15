import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';

const SignUp = () => {
    const [orcid, setOrcid] = React.useState(false);

    return (
        <div className="min-h-screen flex justify-center items-center container mx-auto">
            <div className="flex flex-col gap-9 items-center max-w-sm">
                <header className="flex justify-center">
                    <h1 className="text-typo-black text-4xl font-medium">Sign Up</h1>
                </header>
                <div>
                    <h2 className="text-typo-black text-xl mb-2">Connect your wallet</h2>
                    <p className="text-typo-dark-grey text-sm mb-5">
                        Choose a wallet to connect. If you don't have a wallet, you can select a provider and create
                        one. <a className="text-typo-dark-blue decoration-typo-dark-blue underline">Learn More</a>
                    </p>
                    <Button variant="small">Connect Wallet</Button>
                </div>
                <form className="grid grid-cols-1 gap-7 w-full">
                    <InputGroup label={'Enter your name'}>
                        <Input type="text" name="name" placeholder="Name" />
                    </InputGroup>
                    <InputGroup label={'Enter your role'}>
                        <Select
                            options={[]}
                            getOptionLabel={() => ''}
                            changeHandler={() => {}}
                            selected="-1"
                            placeholder="Select your role"
                        />
                    </InputGroup>
                    <div className="block text-left">
                        <span className="text-[#131317] block font-medium text-lg mb-2">Do you have an ORCID?</span>
                        <div className="flex gap-8">
                            <div>
                                <input
                                    className="mr-3"
                                    type="radio"
                                    value="yes"
                                    name="orcid"
                                    id="yes"
                                    onChange={(evt) => setOrcid(evt.target.value === 'yes')}
                                />
                                <label htmlFor="yes">Yes</label>
                            </div>
                            <div>
                                <input
                                    className="mr-3"
                                    type="radio"
                                    value="no"
                                    name="orcid"
                                    id="no"
                                    onChange={(evt) => setOrcid(!(evt.target.value === 'no'))}
                                />
                                <label htmlFor="no">No</label>
                            </div>
                        </div>
                    </div>
                    {orcid && (
                        <InputGroup label={'Enter your ORCID'}>
                            <Input type="text" name="orcid" placeholder="ORCID" />
                        </InputGroup>
                    )}

                    <div className="flex justify-center">
                        <Button variant="blue">Create Profile</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
interface ButtonI {
    variant: 'light' | 'blue' | 'secondary' | 'small';
    children: string;
}
const Button = ({ variant, children }: ButtonI) => {
    const variants = {
        light: 'rounded-full px-9 py-3 leading-tight font-medium text-typo-dark-blue bg-button-main hover:bg-button-hover focus:bg-button-main focus:ring-ring focus:ring-4',
        blue: 'rounded-full px-9 py-3 leading-tight font-medium text-typo-white bg-button-blue hover:bg-button-hover-dark focus:bg-button-blue focus:ring-ring focus:ring-4',
        secondary:
            'rounded-full px-9 py-3 leading-tight font-medium text-typo-white bg-transparent border border-button-main hover:bg-button-blue focus:bg-transparent focus:ring-ring focus:ring-4',
        small: 'rounded-full px-5 py-2 text-sm text-typo-dark-blue bg-button-main border border-button-blue hover:bg-button-hover focus:bg-button-main focus:ring-ring focus:ring-4',
    };
    return <button className={variants[variant]}>{children}</button>;
};

const InputGroup = ({ label, children }: any) => {
    return (
        <label className="block text-left">
            <span className="text-[#131317] block font-medium text-lg mb-2">{label}</span>
            {children}
        </label>
    );
};

const Input = ({ type, name, placeholder, value = '' }: any) => {
    return (
        <input
            type={type}
            name={name}
            id={name}
            defaultValue={value}
            placeholder={placeholder}
            className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 disabled:opacity-50"
        />
    );
};

interface SelectI {
    options: any[];
    getOptionLabel: (option: any) => string;
    changeHandler: (evt: any) => any;
    selected: string;
    placeholder?: string;
}

const Select = ({ options, getOptionLabel, changeHandler, selected, placeholder }: SelectI) => {
    return (
        <select
            className="w-full bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 disabled:opacity-50"
            name="type"
            defaultValue={selected}
            onChange={(evt) => changeHandler(options[Number(evt.target.value)])}
        >
            {placeholder && (
                <option value={selected} disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option, index) => (
                <option value={index} key={index}>
                    {getOptionLabel(option)}
                </option>
            ))}
        </select>
    );
};

export default SignUp;
