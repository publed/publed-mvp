import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { web3, AnchorProvider, Program } from '@project-serum/anchor';
import idl from './idl.json';

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
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

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
            <WalletMultiButton />
            <button onClick={createPubled}> Create Publed </button>
            <button onClick={signUp}> Sign Up </button>
        </div>
    );
};
