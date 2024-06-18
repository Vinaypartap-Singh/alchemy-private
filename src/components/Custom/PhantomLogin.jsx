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
import { useRouter } from 'next/navigation'; // Import useRouter hook

const PhantomLogin = () => {
    const { publicKey, connect, disconnect } = useWallet();
    const [isConnected, setIsConnected] = useState(false);
    const router = useRouter(); // Initialize the useRouter hook

    useEffect(() => {
        if (publicKey) {
            console.log('Connected with Public Key:', publicKey.toString());
            // Store the public key in local storage
            localStorage.setItem('publicKey', publicKey.toString());
            // Redirect to the main page after successful login
            router.push('/');
        }
    }, [publicKey, router]);

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
            // Remove the public key from local storage
            localStorage.removeItem('publicKey');
        } catch (err) {
            console.error('Disconnection error', err);
        }
    }, [disconnect]);

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
