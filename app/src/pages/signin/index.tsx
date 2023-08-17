import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const SignIn = () => {
    return (
        <div className="min-h-screen flex justify-center items-center container mx-auto">
            {' '}
            <p className="text-black">SignIn</p>
            <WalletMultiButton className="" />
        </div>
    );
};

export default SignIn;
