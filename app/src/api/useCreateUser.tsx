import { SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { getUserKey } from '../context/PubledContext';

export function useCreateUser(program: Program, provider: Provider | undefined) {
    async function createUser(name: String, avatar: String, orcid: String) {
        console.log('Provider:', provider?.wallet.publicKey);

        const userAccount = await getUserKey(provider?.wallet.publicKey);

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
