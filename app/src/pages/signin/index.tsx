import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useContext, useEffect } from 'react';
import WalletRadio from '../../components/WalletRadio';
import { PubledContext } from '../../context/PubledContext';

const SignIn = () => {
    //@ts-ignore
    const { initialized } = useContext(PubledContext);

    useEffect(() => {}, [initialized]);

    return (
        <div className="min-h-screen w-full flex justify-center items-center pt-20 bg-background-grey">
            <div className="flex flex-col items-center max-w-sm">
                <div className="text-default-100 w-full">
                    <h1 className="text-center text-4xl font-medium mb-5">Sign In</h1>
                    <p className="mb-9">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-dark-blue-60">
                            Sign Up
                        </a>
                    </p>
                    <h2 className="text-xl leading-normal font-medium mb-5">Connect your wallet</h2>
                </div>
                {/* <div className="flex flex-col space-y-3">
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
                </div> */}
                <WalletMultiButton className="wallet-custom priority" />
            </div>
        </div>
    );
};

export default SignIn;
