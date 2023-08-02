import React, { useContext, useEffect, useState } from 'react';
import { PubledContext, PubledContextType } from '../../context/PubledContext';
import { Button, Divider } from '@mui/material';
import { PublicKey } from '@solana/web3.js';
import Tables from '../../components/Tables';
import FormComponent from '../../components/Form';
import { getPostById } from '../../context/functions/getPostById';

interface IPubled {
    publicKey: PublicKey;
    account: { authority: PublicKey; currentPostKey: PublicKey };
}
interface IUser {
    publicKey: PublicKey;
    account: { name: String; avatar: String; orcid: String; authority: PublicKey };
}
interface IPost {
    publicKey: PublicKey;
    account: { title: String; content: String; authority: PublicKey; prePostKey: PublicKey; user: PublicKey };
}

const BackOffice = () => {
    const { program, connection, createUser, updateUser, createPost, updatePost, deletePost, createReview } =
        useContext(PubledContext) as PubledContextType;
    const [publedAccounts, setPubledAccounts] = useState<IPubled[]>([]);
    const [userAccounts, setUserAccounts] = useState<IUser[]>([]);
    const [postAccounts, setPostAccounts] = useState<IPost[]>([]);
    const [updatedUser, setUpdatedUser] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const publed = await program?.account.publedState.all();
            setPubledAccounts(publed);

            const users = await program?.account.userState.all();
            setUserAccounts(users);
            const reviews = await program?.account.reviewState.all();
            console.log(reviews);

            console.log(await program?.account.postState.all());

            const p = await program?.account.publedState.fetch(
                // Main Publed State
                new PublicKey('8RqEmmuWsyRV9sKFZAQ1GVZjqkH3YtHq34Wo3qMQmHnE')
            );
            const latestPostId = p?.currentPostKey.toString();
            console.log(latestPostId);

            const ps = [];

            let nextPostId = latestPostId;
            while (!!nextPostId) {
                const post = await getPostById(nextPostId, program);
                if (!post) {
                    break;
                }

                ps?.push(post);
                nextPostId = post.prePostId;
            }
            console.log(ps);
            setPostAccounts(ps);
        };

        fetchData();
    }, [updatedUser, program]);

    const userFormFields = [
        { label: 'Name', name: 'name' },
        { label: 'Avatar', name: 'avatar' },
    ];
    const createUserFormFields = [
        { label: 'Name', name: 'name' },
        { label: 'Avatar', name: 'avatar' },
        { label: 'Orcid', name: 'orcid' },
    ];

    const postFormFields = [
        { label: 'Title', name: 'title' },
        { label: 'Content', name: 'content' },
        { label: 'Address', name: 'address' },
    ];
    const deleteFormFields = [{ label: 'Address', name: 'address' }];

    const handleCreateUser = async (formData: any) => {
        console.log('Creating User:', formData);

        await createUser(formData.name, formData.avatar, formData.orcid);

        setTimeout(() => {
            setUpdatedUser(!updatedUser);
        }, 10000);
    };
    const handleUpdateUser = async (formData: any) => {
        console.log('Updating User:', formData);

        await updateUser(formData.name, formData.avatar);

        setTimeout(() => {
            setUpdatedUser(!updatedUser);
        }, 10000);
    };

    const handleCreatePost = async (formData: any) => {
        console.log('Creating Post:', formData);

        await createPost(formData.title, formData.content);

        setTimeout(() => {
            setUpdatedUser(!updatedUser);
        }, 10000);
    };
    const handleUpdatePost = async (formData: any) => {
        console.log('Updating Post:', formData);

        await updatePost(formData.title, formData.content, formData.address);

        setTimeout(() => {
            setUpdatedUser(!updatedUser);
        }, 10000);
    };
    const handleDeletePost = async (formData: any) => {
        console.log('Deleting Post:', formData);

        await deletePost(formData.address);

        setTimeout(() => {
            setUpdatedUser(!updatedUser);
        }, 10000);
    };

    return (
        <div>
            <h1 style={{ color: 'white' }}>BackOffice</h1>
            <Divider sx={{ color: 'white', my: 'auto' }} />
            <h2 style={{ color: 'white' }}>
                Program: {program?.idl.metadata.address} <br />
                RPC: {connection.rpcEndpoint === 'https://api.devnet.solana.com' ? 'devnet' : 'localhost'}
            </h2>
            <h2 style={{ color: 'white' }}>Publed</h2>

            <Tables data={publedAccounts} columns={['publicKey', 'account.authority', 'account.currentPostKey']} />

            <h2 style={{ color: 'white' }}>Users</h2>
            <Tables
                data={userAccounts}
                columns={['publicKey', 'account.name', 'account.avatar', 'account.orcid', 'account.authority']}
            />

            <h2 style={{ color: 'white' }}>Create User</h2>

            <FormComponent
                formTitle="Create User"
                submitButtonText="Create User"
                onSubmit={handleCreateUser}
                formFields={createUserFormFields}
            />
            <h2 style={{ color: 'white' }}>Edit User</h2>

            <FormComponent
                formTitle="Update User"
                submitButtonText="Update User"
                onSubmit={handleUpdateUser}
                formFields={userFormFields}
            />

            <h2 style={{ color: 'white' }}>Posts</h2>
            <Tables data={postAccounts} columns={['id', 'title', 'content', 'authority', 'prePostId', 'userId']} />

            <h2 style={{ color: 'white' }}>Create Post</h2>

            <FormComponent
                formTitle="Create Post"
                submitButtonText="Create Post"
                onSubmit={handleCreatePost}
                formFields={postFormFields}
            />
            <h2 style={{ color: 'white' }}>Edit Post</h2>

            <FormComponent
                formTitle="Update Post"
                submitButtonText="Update Post"
                onSubmit={handleUpdatePost}
                formFields={postFormFields}
            />

            <h2 style={{ color: 'white' }}>Delete Post</h2>

            <FormComponent
                formTitle="Delete Post"
                submitButtonText="Delete Post"
                onSubmit={handleDeletePost}
                formFields={deleteFormFields}
            />

            <Button onClick={() => createReview('a', 'a', 'a', 'HvaouxeiCmdKDEPnXuENRPNJ9ujoHtFGDPEfDXXuqBme')}>
                Create Review
            </Button>
        </div>
    );
};

export default BackOffice;
