import React, { FC, ReactNode, createContext, useEffect, useId, useMemo, useState } from 'react';
import idl from '../idl.json';
import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Idl, Program, Wallet } from '@project-serum/anchor';
import { useCreateUser } from '../api/useCreateUser';
import { useBackOffice } from '../api/useBackOffice';
import { useUpdateUser } from '../api/useUpdateUser';
import { useCreatePost } from '../api/useCreatePost';
import { useUpdatePost } from '../api/useUpdatePost';

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
    connection: Connection;
    createUser: () => void;
    backOffice: () => void;
    updateUser: (name: String, avatar: String) => void;
    createPost: () => void;
    updatePost: () => void;
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

    const backOffice = useBackOffice(program);
    const createUser = useCreateUser(program, provider);
    const updateUser = useUpdateUser(program, provider);
    const createPost = useCreatePost(program, provider);
    const updatePost = useUpdatePost(program, provider);

    return (
        <PubledContext.Provider
            value={{
                anchorWallet,
                program,
                provider,
                connection,
                createUser,
                backOffice,
                updateUser,
                createPost,
                updatePost,
            }}
        >
            {children}
        </PubledContext.Provider>
    );
};

export default PubledProvider;
