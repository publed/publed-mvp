import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React, { useContext, useEffect } from 'react';
import WalletRadio from '../../components/WalletRadio';
import { PubledContext } from '../../context/PubledContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    //@ts-ignore
    const { initialized } = useContext(PubledContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialized) navigate('/explore');
    }, [initialized]);

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
                <WalletMultiButton className="wallet-custom priority" />
            </div>
        </div>
    );
};

export default SignIn;
