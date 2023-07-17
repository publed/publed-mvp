import { Program } from '@project-serum/anchor';

export function useBackOffice(program: Program | undefined) {
    async function backOffice() {
        const users = await program?.account.userState.all();
        const posts = await program?.account.postState.all();

        users?.forEach((user) => {
            console.log(
                `Username: ${user.account.name}`,
                '\nPubkey:',
                user.publicKey.toString(),
                '\nAuthority:',
                user.account.authority.toString()
            );
        });
    }

    return backOffice;
}
