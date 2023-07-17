import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { getUserKey } from '../context/PubledContext';

export function useCreateUser(program: Program, provider: Provider | undefined) {
    async function createUser() {
        const name = 'Test1';
        const avatar = 'https://gravatar.com/avatar/e5b1e1ff1780db217085c8733aa1405c?s=400&d=robohash&r=x';
        const orcid = '0';

        const userAccount = getUserKey(provider?.wallet.publicKey);

        // const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);

        await program.rpc.signupUser(name, avatar, orcid, {
            accounts: {
                authority: provider?.wallet.publicKey,
                userAccount: userAccount.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [userAccount],
        });

        // const user = await program.account.userState.fetch(userAccount.publicKey);
        // console.log('User:', user);
    }

    return createUser;
}
