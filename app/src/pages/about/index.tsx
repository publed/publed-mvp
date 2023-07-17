import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useEffect } from 'react';

const About = () => {
    const wallet = useWallet();
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

    return (
        <div>
            <h1>About Page</h1>
        </div>
    );
};

export default About;
