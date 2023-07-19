import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { getUserKey } from '../context/PubledContext';

export function useUpdatePost(program: Program, provider: Provider | undefined) {
    const updatePost = async (name: String, avatar: String) => {
        async function updatePost() {
            const userAccount = getUserKey(provider?.wallet.publicKey);

            const title = 'Title';
            const content = 'Content';

            await program.rpc.updatePost(title, content, {
                accounts: {
                    authority: provider?.wallet.publicKey,
                    postAccount: new PublicKey('6218kZ4PpgMVAaeHfEuGrzBAdH5rGMwMTXE2zCLPa3Sq'),
                },
            });
            // const user = await program.account.userState.fetch(userAccount.publicKey);
            // console.log('User:', user);
        }

        updatePost();
    };

    return updatePost;
}
