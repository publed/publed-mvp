import { SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { getUserKey } from '../context/PubledContext';

export function useUpdateUser(program: Program, provider: Provider | undefined) {
    const updateUser = async (name: String, avatar: String) => {
        async function updateUser() {
            const userAccount = getUserKey(provider?.wallet.publicKey);

            await program.rpc.updateUser(name, avatar, {
                accounts: {
                    authority: provider?.wallet.publicKey,
                    userAccount: userAccount.publicKey,
                    systemProgram: SystemProgram.programId,
                },
            });
            const user = await program.account.userState.fetch(userAccount.publicKey);
            console.log('User:', user);
        }

        updateUser();
    };

    return updateUser;
}
