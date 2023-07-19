import React, { useContext, useEffect, useState } from 'react';
import { PubledContext, PubledContextType } from '../../context/PubledContext';
import {
    Box,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { PublicKey } from '@solana/web3.js';

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
    const { program, connection, createUser, updateUser, createPost, updatePost } = useContext(
        PubledContext
    ) as PubledContextType;
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

            const posts = await program?.account.postState.all();
            setPostAccounts(posts);

            console.log(posts);
        };

        fetchData();
    }, [updatedUser]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await updateUser(data.get('name') as string, data.get('avatar') as string);

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
            <TableContainer sx={{ color: 'white', backgroundColor: 'white' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Public Key</TableCell>
                            <TableCell>Authority</TableCell>
                            <TableCell>Current Post Key</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {publedAccounts.map((row) => (
                            <TableRow key={row.publicKey.toString()}>
                                <TableCell>{row.publicKey.toString()}</TableCell>
                                <TableCell>{row.account.authority.toString()}</TableCell>
                                <TableCell>{row.account.currentPostKey.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h2 style={{ color: 'white' }}>Users</h2>
            <TableContainer sx={{ color: 'white', backgroundColor: 'white' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Public Key</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Orcid</TableCell>
                            <TableCell>Authority</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userAccounts?.map((row) => (
                            <TableRow key={row.publicKey.toString()}>
                                <TableCell>{row.publicKey.toString()}</TableCell>
                                <TableCell>{row.account.name}</TableCell>
                                <TableCell>{row.account.avatar}</TableCell>
                                <TableCell>{row.account.orcid}</TableCell>
                                <TableCell>{row.account.authority.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h2 style={{ color: 'white' }}>Edit User</h2>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    backgroundColor: 'white',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField id="name" label="name" variant="standard" name="name" />
                <TextField id="avatar" label="avatar" variant="standard" name="avatar" />
                <Button type="submit">Update User</Button>
            </Box>

            <h2 style={{ color: 'white' }}>Posts</h2>
            <TableContainer sx={{ color: 'white', backgroundColor: 'white' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Public Key</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Authority</TableCell>
                            <TableCell>PrePostKey</TableCell>
                            <TableCell>User</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postAccounts?.map((row) => (
                            <TableRow key={row.publicKey.toString()}>
                                <TableCell>{row.publicKey.toString()}</TableCell>
                                <TableCell>{row.account.title}</TableCell>
                                <TableCell>{row.account.content}</TableCell>
                                <TableCell>{row.account.authority.toString()}</TableCell>
                                <TableCell>{row.account.prePostKey.toString()}</TableCell>
                                <TableCell>{row.account.user.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <button onClick={createUser}>Create User</button>
            <button onClick={createPost}>Create Post</button>
            <button onClick={updatePost}>Update Post</button>
        </div>
    );
};

export default BackOffice;
