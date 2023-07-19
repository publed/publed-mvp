import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { getUserKey } from '../context/PubledContext';

export function useUpdateUser(program: Program, provider: Provider | undefined) {
    const updateUser = async (name: String, avatar: String) => {
        async function createUser() {
            const userAccount = getUserKey(provider?.wallet.publicKey);

            await program.rpc.updateUser(name, avatar, {
                accounts: {
                    authority: provider?.wallet.publicKey,
                    userAccount: userAccount.publicKey,
                    systemProgram: SystemProgram.programId,
                },
            });
            // const user = await program.account.userState.fetch(userAccount.publicKey);
            // console.log('User:', user);
        }

        createUser();
    };

    return updateUser;
}
