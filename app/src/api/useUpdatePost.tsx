import { PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';

export function useUpdatePost(program: Program, provider: Provider | undefined) {
    const updatePost = async (title: String, content: String, postAddress: String) => {
        async function updatePost() {
            const postAccount = new PublicKey(postAddress);

            await program.rpc.updatePost(title, content, {
                accounts: {
                    authority: provider?.wallet.publicKey,
                    postAccount: postAccount,
                },
            });
            const post = await program.account.postState.fetch(postAccount);
            console.log('post:', post);
        }

        updatePost();
    };

    return updatePost;
}
