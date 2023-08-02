import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import { getUserKey } from '../context/PubledContext';

export function useCreateReview(program: Program, provider: Provider) {
    const createReview = async (strenghts: String, weaknesses: String, obs: String, postAddress: String) => {
        async function createReview() {
            const userAccount = await getUserKey(provider?.wallet.publicKey);
            const postAccount = new PublicKey(postAddress);

            const reviewAccount = Keypair.generate();

            await program.rpc.createReview(strenghts, weaknesses, obs, {
                accounts: {
                    authority: provider?.wallet.publicKey,
                    userAccount: userAccount?.publicKey,
                    reviewAccount: reviewAccount.publicKey,
                    systemProgram: SystemProgram.programId,
                    postAccount: postAccount,
                },
                signers: [reviewAccount],
            });

            const review = await program.account.reviewState.fetch(reviewAccount.publicKey);
            return review;
        }
        createReview();
    };

    return createReview;
}
