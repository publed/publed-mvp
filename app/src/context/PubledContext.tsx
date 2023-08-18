import React, { FC, ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import idl from '../idl.json';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Idl, Program, Wallet } from '@project-serum/anchor';
import { useCreateUser } from '../api/useCreateUser';
import { useUpdateUser } from '../api/useUpdateUser';
import { useCreatePost } from '../api/useCreatePost';
import { useUpdatePost } from '../api/useUpdatePost';
import { useDeletePost } from '../api/useDeletePost';
import { useCreateReview } from '../api/useCreateReview';

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
    user?: IUser | undefined;
    posts?: IPost | undefined;
    initialized?: Boolean;
    anchorWallet?: AnchorWallet;
    program?: Program<Idl>;
    provider?: AnchorProvider;
    connection: Connection;
    createUser: (name: String, avatar: String, orcid: String) => void;
    updateUser: (name: String, avatar: String) => void;
    createPost: (title: String, content: String) => void;
    updatePost: (title: String, content: String, postAddress: String) => void;
    deletePost: (postAddress: String) => void;
    createReview: (strenghts: String, weaknesses: String, obs: String, postAddress: String) => void;
};

export const getUserKey = (walletKey: PublicKey) => {
    const userAccount = Keypair.fromSeed(
        new TextEncoder().encode(`${PROGRAM_KEY.toString().slice(0, 15)}__${walletKey.toString().slice(0, 15)}`)
    );

    return userAccount;
};

export const PubledContext = createContext<PubledContextType | null>(null);

//@ts-ignore
const PubledProvider: FC<ReactNode> = ({ children }) => {
    const anchorWallet = useAnchorWallet();
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    const [user, setUser] = useState<IUser>();
    const [posts, setPosts] = useState();
    const [initialized, setInitialized] = useState<boolean>(false);
    const [provider, setProvider] = useState();

    let program: Program;
    let p;
    program = useMemo(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        p = new AnchorProvider(connection, anchorWallet as Wallet, AnchorProvider.defaultOptions());
        //@ts-ignore
        setProvider(p);
        console.log('Provider p: ', p);

        return new Program(idl as Idl, PROGRAM_KEY, p);
    }, [connection, anchorWallet]);

    console.log('Provider Context: ', provider);

    useEffect(() => {
        async function start() {
            console.log('Starting...');
            console.log('publick key', publicKey?.toString());

            if (program && publicKey) {
                try {
                    console.log('Public Key: ', publicKey?.toString());
                    listPosts();

                    const upk = await getUserKey(publicKey);
                    const user = await program.account.userState.fetch(upk.publicKey);
                    console.log('User:', user);

                    if (user) {
                        setInitialized(true);
                        //@ts-ignore
                        setUser(user);
                    }
                } catch (error) {
                    console.log('No users');
                    setInitialized(false);
                    setUser(undefined);
                    console.log(error);
                }
            }
        }

        start();
    }, [program, publicKey]);

    const createUser = useCreateUser(program, provider);
    const updateUser = useUpdateUser(program, provider);
    //@ts-ignore
    const createPost = useCreatePost(program, provider);
    const updatePost = useUpdatePost(program, provider);
    const deletePost = useDeletePost(program, provider);
    //@ts-ignore
    const createReview = useCreateReview(program, provider);

    const listPosts = async () => {
        const posts = await program?.account.postState.all();
        //@ts-ignore
        setPosts(posts);
    };

    return (
        <PubledContext.Provider
            value={{
                user,
                posts,
                initialized,
                anchorWallet,
                program,
                provider,
                connection,
                createUser,
                updateUser,
                createPost,
                updatePost,
                deletePost,
                createReview,
            }}
        >
            {children}
        </PubledContext.Provider>
    );
};

export default PubledProvider;
