import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { getUserKey } from '../context/PubledContext';

const PUBLED_KEY = new PublicKey('8RqEmmuWsyRV9sKFZAQ1GVZjqkH3YtHq34Wo3qMQmHnE');

export function useCreatePost(program: Program, provider: Provider | undefined) {
    async function createPost() {
        const title = 'BAO';
        const content = 'Hypervisor';

        const postAccount = Keypair.generate();
        const userAccount = getUserKey(provider?.wallet.publicKey);

        await program.rpc.createPost(title, content, {
            accounts: {
                authority: provider?.wallet.publicKey,
                userAccount: userAccount.publicKey,
                systemProgram: SystemProgram.programId,
                publedAccount: PUBLED_KEY,
                postAccount: postAccount.publicKey,
            },
            signers: [postAccount],
        });

        const post = await program.account.postState.fetch(postAccount.publicKey);
        return post;
    }

    return createPost;
}
