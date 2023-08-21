import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { BackpackWalletAdapter, PhantomWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo } from 'react';

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    // const network = WalletAdapterNetwork.devnet;
    // const network = 'http://127.0.0.1:8899';

    let network;
    let endpoint;
    console.log(process.env.REACT_APP_NETWORK);

    endpoint = useMemo(() => {
        if (process.env.REACT_APP_NETWORK === 'localhost') {
            network = 'http://127.0.0.1:8899';
            return network;
        } else {
            network = WalletAdapterNetwork.Devnet;

            return clusterApiUrl(network);
        }
    }, [network]);
    // You can also provide a custom RPC endpoint.

    // const endpoint = network;

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new PhantomWalletAdapter(),
            new BackpackWalletAdapter(),
            new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            {/* <WalletProvider wallets={wallets} autoConnect> */}
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
