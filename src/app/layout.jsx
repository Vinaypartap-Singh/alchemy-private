"use client";

import { ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "@/components/Custom/Header";
import "./globals.css";

export default function RootLayout({ children }) {
    const endpoint = clusterApiUrl("mainnet-beta");
    const wallets = [new PhantomWalletAdapter()];

    return (
        <html lang="en">
          <body>
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <Header /> {/* Render Header only here */}
                  {children}
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </body>
        </html>
    );
}
