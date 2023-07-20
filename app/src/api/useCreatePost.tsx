import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { getUserKey } from '../context/PubledContext';

const PUBLED_KEY = new PublicKey('8RqEmmuWsyRV9sKFZAQ1GVZjqkH3YtHq34Wo3qMQmHnE');

export function useCreatePost(program: Program, provider: Provider) {
    const createPost = async (title: String, content: String) => {
        async function createPost() {
            const userAccount = await getUserKey(provider?.wallet.publicKey);

            const postAccount = Keypair.generate();

            await program.rpc.createPost(title, content, {
                accounts: {
                    authority: provider?.wallet.publicKey,
                    userAccount: userAccount?.publicKey,
                    systemProgram: SystemProgram.programId,
                    publedAccount: PUBLED_KEY,
                    postAccount: postAccount.publicKey,
                },
                signers: [postAccount],
            });

            const post = await program.account.postState.fetch(postAccount.publicKey);
            return post;
        }
        createPost();
    };

    return createPost;
}
