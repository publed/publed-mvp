const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

async function createPubled(program, provider) {
  const initPubledAccount = anchor.web3.Keypair.generate();
  const genesisPostAccount = anchor.web3.Keypair.generate();

  await program.rpc.initPubled({
    accounts: {
      authority: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
      publedAccount: initPubledAccount.publicKey,
      genesisPostAccount: genesisPostAccount.publicKey,
    },
    signers: [initPubledAccount, genesisPostAccount],
  });

  const publed = await program.account.publedState.fetch(
    initPubledAccount.publicKey
  );

  return { publed, publedAccount: initPubledAccount, genesisPostAccount };
}

module.exports = {
  createPubled,
};
