"use client";

import React, { useMemo, useEffect } from 'react';
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

const PhantomLogin = ({ onClose }) => {
    const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
    const { connected, publicKey } = useWallet();

    useEffect(() => {
        if (connected) {
            localStorage.setItem('user', JSON.stringify({ publicKey: publicKey.toString() }));
            onClose(); // Close the login modal
            window.location.reload(); // Reload to update the state
        }
    }, [connected, publicKey, onClose]);

    return (
        <div className="login-modal">
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <button onClick={onClose}>Close</button>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
};

export default PhantomLogin;
