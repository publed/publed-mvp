import React, { useContext } from 'react';
import { PubledContext, PubledContextType } from '../../context/PubledContext';

const Home = () => {
    const { program, provider, anchorWallet, createUser, backOffice } = useContext(PubledContext) as PubledContextType;
    console.log(program?.account);
    // console.log(provider?.publicKey.toString());
    console.log(anchorWallet?.publicKey.toString());

    async function getAccounts() {
        const publed = await program?.account.publedState.all();
        const users = await program?.account.userState.all();
        publed?.map((pub, key) => console.log(`Acc #${key}: `, pub.publicKey.toString()));
        users?.map((user, key) => console.log(`${user.account.name}: `, user.publicKey.toString()));

        // const u = await useUser();
        // console.log(u);
    }

    return (
        <div>
            Home
            <button onClick={getAccounts}>Get Accounts</button>
            <button onClick={createUser}>Create User</button>
            <button onClick={backOffice}>Back Office</button>
        </div>
    );
};

export default Home;
