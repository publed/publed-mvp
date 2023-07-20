import { PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';

export function useDeletePost(program: Program, provider: Provider | undefined) {
    const deletePost = async (postAddress: String) => {
        async function deletePost() {
            const postAccount = new PublicKey(postAddress);

            await program.rpc.deletePost({
                accounts: {
                    authority: provider?.wallet.publicKey,
                    postAccount: postAccount,
                },
            });
            const user = await program.account.postState.fetch(postAccount);
            console.log('User:', user);
        }

        deletePost();
    };

    return deletePost;
}
