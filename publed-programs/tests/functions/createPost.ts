const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

async function createPost(program, provider, publedAccount, userAccount) {
  const postAccount = anchor.web3.Keypair.generate();
  const title = "post title";
  const content = "post content";

  await program.rpc.createPost(title, content, {
    accounts: {
      publedAccount: publedAccount.publicKey,
      authority: provider.wallet.publicKey,
      userAccount: userAccount.publicKey,
      postAccount: postAccount.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [postAccount],
  });

  const post = await program.account.postState.fetch(postAccount.publicKey);
  return { post, postAccount, title, content };
}

module.exports = {
  createPost,
};
