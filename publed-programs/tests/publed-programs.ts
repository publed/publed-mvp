const anchor = require("@project-serum/anchor");
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PubledPrograms } from "../target/types/publed_programs";
import { assert } from "chai";
const { createPubled } = require("./functions/createPubled");
const { createUser } = require("./functions/createUser");
const { createPost } = require("./functions/createPost");
const { SystemProgram } = anchor.web3;

describe("publed-programs", () => {
  const provider = AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.PubledPrograms as Program<PubledPrograms>;

  it("initializes publed account", async () => {
    const { publed, publedAccount, genesisPostAccount } = await createPubled(
      program,
      provider
    );
    console.log("Publed:", publed.authority.toString());
    console.log("PubledAccount:", publedAccount.publicKey.toString());
    console.log("GenesisPostAccount:", genesisPostAccount.publicKey.toString());

    assert.equal(
      publed.currentPostKey.toString(),
      genesisPostAccount.publicKey.toString()
    );

    assert.equal(
      publed.authority.toString(),
      provider.wallet.publicKey.toString()
    );
  });

  it("signup a new user", async () => {
    const { user, name, avatar } = await createUser(program, provider);

    console.log(
      "User:" + "\n-name ",
      user.name + "\n-avatar ",
      user.avatar + "\n-authority ",
      user.authority.toString() + "\n-orcid ",
      user.orcid
    );

    assert.equal(user.name, name);
    assert.equal(user.avatar, avatar);

    assert.equal(
      user.authority.toString(),
      provider.wallet.publicKey.toString()
    );
  });

  it("creates a new post", async () => {
    const { publed, publedAccount } = await createPubled(program, provider);
    const { userAccount } = await createUser(program, provider);

    const { title, post, content } = await createPost(
      program,
      provider,
      publedAccount,
      userAccount
    );

    assert.equal(post.title, title);
    assert.equal(post.content, content);
    assert.equal(post.user.toString(), userAccount.publicKey.toString());
    assert.equal(post.prePostKey.toString(), publed.currentPostKey.toString());
    assert.equal(
      post.authority.toString(),
      provider.wallet.publicKey.toString()
    );

    console.log(
      "Post:" + "\n-title ",
      post.title + "\n-content ",
      post.content + "\n-authority ",
      post.authority.toString()
    );
    const post2 = await createPost(
      program,
      provider,
      publedAccount,
      userAccount
    );

    console.log(
      "Post:" + "\n-title ",
      post2.post.title + "\n-content ",
      post2.post.content + "\n-authority ",
      post2.post.authority.toString()
    );
  });
});
