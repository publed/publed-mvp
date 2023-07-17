import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { getUserKey } from '../context/PubledContext';

export function useCreatePost(program: Program, provider: Provider | undefined, publedAccount) {
    async function createPost() {
        const title = 'BAO';
        const content = 'Hypervisor';

        const postAccount = Keypair.generate();
        // const [userPda] = findProgramAddressSync([utf8.encode('user'), publicKey.toBuffer()], program.programId);

        await program.rpc.createPost(title, content, {
            accounts: {
                authority: provider?.wallet.publicKey,
                userAccount: userAccount.publicKey,
                systemProgram: SystemProgram.programId,
                // Finalizar isto !!!!
                // publedAccount: BLOG_KEY,
                // authority: provider?.wallet.publicKey,
                // userAccount: new PublicKey(user.id),
                // postAccount: postAccount.publicKey,
                // systemProgram: SystemProgram.programId,
            },
            signers: [userAccount],
        });

        // const user = await program.account.userState.fetch(userAccount.publicKey);
        // console.log('User:', user);
    }

    return createPost;
}
