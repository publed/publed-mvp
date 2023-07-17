import React, { FC, ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import idl from '../idl.json';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Idl, Program, Wallet } from '@project-serum/anchor';
import { useCreateUser } from '../api/useCreateUser';
import { useBackOffice } from '../api/useBackOffice';

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

export interface IUser {
    name: string;
    avatar: string;
    orcid: number;
}
export interface IPost {
    title: string;
    content: string;
    authority: PublicKey;
}
export type PubledContextType = {
    anchorWallet?: AnchorWallet;
    program?: Program<Idl>;
    provider?: AnchorProvider;
    createUser: () => void;
    backOffice: () => void;
};

export const getUserKey = (walletKey: PublicKey) => {
    const userAccount = Keypair.fromSeed(
        new TextEncoder().encode(`${PROGRAM_KEY.toString().slice(0, 15)}__${walletKey.toString().slice(0, 15)}`)
    );

    return userAccount;
};

export const PubledContext = createContext<PubledContextType | null>(null);

const PubledProvider: FC<ReactNode> = ({ children }) => {
    console.log('Program Key:', PROGRAM_KEY.toString());

    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();

    let program;
    let provider;

    program = useMemo(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        provider = new AnchorProvider(connection, anchorWallet as Wallet, AnchorProvider.defaultOptions());
        return new Program(idl as Idl, PROGRAM_KEY, provider);
    }, [connection, anchorWallet]);

    console.log('Provider:', provider);

    const createUser = useCreateUser(program, provider);
    const backOffice = useBackOffice(program);

    return (
        <PubledContext.Provider value={{ anchorWallet, program, provider, createUser, backOffice }}>
            {children}
        </PubledContext.Provider>
    );
};

export default PubledProvider;
