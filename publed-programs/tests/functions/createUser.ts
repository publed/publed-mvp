const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

async function createUser(program, provider) {
  const userAccount = anchor.web3.Keypair.generate();

  const name = "Vítor Ribeiro";
  const avatar =
    "https://gravatar.com/avatar/e5b1e1ff1780db217085c8733aa1405c?s=400&d=robohash&r=x";
  const orcid = "0";

  await program.rpc.signupUser(name, avatar, orcid, {
    accounts: {
      authority: provider.wallet.publicKey,
      userAccount: userAccount.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [userAccount],
  });

  const user = await program.account.userState.fetch(userAccount.publicKey);
  return { user, userAccount, name, avatar, orcid };
}

module.exports = {
  createUser,
};
