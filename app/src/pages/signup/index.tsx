import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useContext, useState } from 'react';
import { PubledContext } from '../../context/PubledContext';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import WalletRadio from '../../components/WalletRadio';
import Select from '../../components/Select';
import Input from '../../components/Input';
import { getAvatarUrl } from '../home';
import { useWallet } from '@solana/wallet-adapter-react';

const SignUp = () => {
    //@ts-ignore
    const { createUser } = useContext(PubledContext);
    const [orcid, setOrcid] = useState(false);
    const [fname, setFname] = useState('');
    const [open, setOpen] = React.useState(false);
    const wallet = useWallet();

    const [selectedRole, setSelectedRole] = useState('');
    const roleOptions = [
        { value: 'university', label: 'University' },
        { value: 'reviewer', label: 'Reviewer' },
        { value: 'author', label: 'Author' },
    ];

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            name: data.get('name'),
            orcid: data.get('orcidNumber'),
        });

        console.log('Creating User:');

        const avatar: string = await getAvatarUrl(wallet?.publicKey?.toString() as string);
        console.log('avatar: ', avatar);

        await createUser(data.get('name'), avatar, data.get('orcidNumber'));

        // setTimeout(() => {
        //     setUpdatedUser(!updatedUser);
        // }, 10000);
    };

    return (
        <div className="min-h-screen flex justify-center items-center container mx-auto mt-12">
            <div className="flex flex-col gap-9 items-center max-w-sm">
                <header className="flex justify-center">
                    <h1 className="text-default-100 text-4xl font-medium">Sign Up</h1>
                </header>
                <div>
                    <h2 className="text-default-100 text-xl mb-2">Connect your wallet</h2>
                    <p className="text-default-70 text-sm mb-5">
                        Choose a wallet to connect. If you don't have a wallet, you can select a provider and create
                        one.{' '}
                        <a className="text-dark-blue-60 decoration-dark-blue-60 underline" href="/#">
                            Learn More
                        </a>
                    </p>
                    <WalletMultiButton className="wallet-custom priority" />
                    <Modal showModal={open} setShowModal={setOpen}>
                        <div className="text-default-100">
                            <h2 className="text-xl text-center font-medium mb-7">Connect your wallet</h2>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <WalletRadio
                                icon={<div className="h-10 w-10 bg-purple-500 rounded-full" />}
                                label="Phantom"
                                id="phantom"
                                name="wallet"
                            />
                            <WalletRadio
                                icon={<div className="h-10 w-10 bg-red-500 rounded-full" />}
                                label="Backpack"
                                id="backpack"
                                name="wallet"
                            />
                        </div>
                    </Modal>
                </div>
                <form className="grid grid-cols-1 gap-7 w-full" onSubmit={handleCreateUser}>
                    <InputGroup label={'Enter your name'}>
                        <Input type="text" name="name" placeholder="Name" />
                    </InputGroup>
                    <InputGroup label={'Enter your role'}>
                        <Select
                            options={roleOptions}
                            getOptionLabel={(option) => option.label}
                            changeHandler={(selectedOption) => setSelectedRole(selectedOption.value)}
                            selected="-1"
                            placeholder="Select your role"
                        />
                    </InputGroup>
                    <div className="block text-left">
                        <span className="text-default-100 block font-medium text-lg mb-2">Do you have an ORCID?</span>
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
                            <Input type="text" name="orcidNumber" placeholder="ORCID" />
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

export const InputGroup = ({ label, children }: any) => {
    return (
        <label className="block text-left">
            <span className="text-default-100 block font-medium text-lg mb-3">{label}</span>
            {children}
        </label>
    );
};

export default SignUp;
