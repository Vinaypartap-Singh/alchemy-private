"use client";

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import wallets from '@/utils/phantom';
import '@solana/wallet-adapter-react-ui/styles.css';

const PhantomLogin = () => {
    const { publicKey, connect, disconnect } = useWallet();
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = useCallback(async () => {
        try {
            await connect();
            setIsConnected(true);
        } catch (err) {
            console.error('Connection error', err);
        }
    }, [connect]);

    const handleDisconnect = useCallback(async () => {
        try {
            await disconnect();
            setIsConnected(false);
        } catch (err) {
            console.error('Disconnection error', err);
        }
    }, [disconnect]);

    useEffect(() => {
        if (publicKey) {
            console.log('Connected with Public Key:', publicKey.toString());
        }
    }, [publicKey]);

    return (
        <div>
            <WalletMultiButton />
            {isConnected ? (
                <button onClick={handleDisconnect}>Disconnect</button>
            ) : (
                <button onClick={handleConnect}>Connect Phantom Wallet</button>
            )}
        </div>
    );
};

const PhantomLoginWrapper = () => {
    const network = clusterApiUrl('devnet'); // Change to 'mainnet-beta' for production
    const endpoint = useMemo(() => network, [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <PhantomLogin />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default PhantomLoginWrapper;
