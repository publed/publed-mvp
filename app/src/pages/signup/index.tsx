import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';

const SignUp = () => {
    return (
        <div className="min-h-screen flex justify-center items-center container mx-auto">
            <div className="flex flex-col gap-9 items-center max-w-sm">
                <header className="flex justify-center">
                    <h1 className="text-4xl font-medium">Sign Up</h1>
                </header>
                <div>
                    <h2 className="text-xl mb-2">Connect your wallet</h2>
                    <p className="text-sm mb-5 text-[#3A3A3A]">
                        Choose a wallet to connect. If you don't have a wallet, you can select a provider and create
                        one. <a className="underline text-[#202668]">Learn More</a>
                    </p>
                    <button className="rounded-full px-5 py-2 border text-sm">Connect Wallet</button>
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
                                <input className="mr-3" type="radio" value="yes" name="yes" id="yes" />
                                <label htmlFor="yes">Yes</label>
                            </div>
                            <div>
                                <input className="mr-3" type="radio" value="no" name="no" id="no" />
                                <label htmlFor="no">No</label>
                            </div>
                        </div>
                    </div>

                    <input className="mx-auto rounded-full px-9 py-3 border" type="submit" value={'Create Profile'} />
                </form>
            </div>
        </div>
    );
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
