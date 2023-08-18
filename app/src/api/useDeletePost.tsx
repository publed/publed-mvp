import { PublicKey } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';

export function useDeletePost(program: Program, provider: Provider | undefined) {
    const deletePost = async (postAddress: String) => {
        async function deletePost() {
            const postAccount = new PublicKey(postAddress);
            const posts = await program.account.postState.all();
            //@ts-ignore
            const p = posts.find((post) => post.account.prePostKey.equals(postAccount));
            //@ts-ignore
            console.log(p?.publicKey.toString(), p?.account.prePostKey.toString());

            await program.rpc.deletePost({
                accounts: {
                    //@ts-ignore
                    authority: provider?.wallet.publicKey,
                    postAccount: postAccount,
                    //@ts-ignore
                    nextPostAccount: p.publicKey,
                },
            });
        }

        deletePost();
    };

    return deletePost;
}
