import { PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';

export function useDeletePost(program: Program, provider: Provider | undefined) {
    const deletePost = async (postAddress: String) => {
        async function deletePost() {
            const postAccount = new PublicKey(postAddress);
            const posts = await program.account.postState.all();
            const p = posts.find((post) => post.account.prePostKey.equals(postAccount));
            console.log(p?.publicKey.toString(), p?.account.prePostKey.toString());

            await program.rpc.deletePost({
                accounts: {
                    authority: provider?.wallet.publicKey,
                    postAccount: postAccount,
                    nextPostAccount: p.publicKey,
                },
            });
        }

        deletePost();
    };

    return deletePost;
}
