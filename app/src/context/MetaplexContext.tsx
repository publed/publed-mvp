import { createContext, ReactNode } from 'react';
import { Metaplex } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl } from '@solana/web3.js';

export interface MetaplexContextType {
    connection: Connection;
    mx: Metaplex;
}

const connection = new Connection(clusterApiUrl('devnet'));
const mx = new Metaplex(connection);

export const MetaplexContext = createContext<MetaplexContextType>({ connection, mx });

interface MetaplexProviderProps {
    children: ReactNode;
}

export const MetaplexProvider: React.FC<MetaplexProviderProps> = ({ children }) => {
    return <MetaplexContext.Provider value={{ connection, mx }}>{children}</MetaplexContext.Provider>;
};
