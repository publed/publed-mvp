import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import React, { FC, useState } from 'react';
import { AnchorProvider, Program } from '@project-serum/anchor';
import idl from './idl.json';
import { SolanaWalletProvider } from './context/SolanaWalletProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PubledRoutes from './routes/routes';
import PubledProvider from './context/PubledContext';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const baseAccount = Keypair.generate();
const publedAccount = Keypair.generate();
const genesisPostAccount = Keypair.generate();
const opts = {
    preflightCommitment: 'processed',
};
const programID = new PublicKey(idl.metadata.address);

// create unique user key
export const getUserKey = (walletKey: PublicKey) => {
    const userAccount = Keypair.fromSeed(
        new TextEncoder().encode(`${programID.toString().slice(0, 15)}__${walletKey.toString().slice(0, 15)}`)
    );

    return userAccount;
};

const App: FC = () => {
    return (
        <SolanaWalletProvider>
            <PubledProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="*"
                            element={
                                <Layout>
                                    <PubledRoutes></PubledRoutes>
                                </Layout>
                            }
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </PubledProvider>
        </SolanaWalletProvider>
    );
};
export default App;

const Content: FC = () => {
    const [value, setValue] = useState(null);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function getProvider() {
        const provider = new AnchorProvider(connection, wallet, opts.preflightCommitment);
        return provider;
    }

    async function createPubled() {
        const provider = await getProvider();

        const program = new Program(idl, programID, provider);
        try {
            await program.rpc.initPubled({
                accounts: {
                    publedAccount: publedAccount.publicKey,
                    authority: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    genesisPostAccount: genesisPostAccount.publicKey,
                },
                signers: [publedAccount, genesisPostAccount],
            });

            const account = await program.account.publedState.fetch(publedAccount.publicKey);
            console.log('account: ', account);
        } catch (error) {
            console.log('Transaction error: ', error);
        }
    }
    async function signUp() {
        const provider = await getProvider();
        const name = 'Vítor Ribeiro';
        const avatar = 'https://gravatar.com/avatar/e5b1e1ff1780db217085c8733aa1405c?s=400&d=robohash&r=x';
        const userAccount = getUserKey(provider.wallet.publicKey);

        const program = new Program(idl, programID, provider);
        try {
            await program.rpc.signupUser(name, avatar, {
                accounts: {
                    authority: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                    userAccount: userAccount.publicKey,
                },
                signers: [userAccount],
            });

            const account = await program.account.userState.fetch(userAccount.publicKey);
            console.log('account: ', account);
        } catch (error) {
            console.log('Transaction error: ', error);
        }
    }
    return (
        <div className="App">
            <button onClick={createPubled}> Create Publed </button>
            <button onClick={signUp}> Sign Up </button>
        </div>
    );
};
