"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PhantomLogin() {
  const [publicKey, setPublicKey] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const connectPhantomWallet = async () => {
      if (window.solana) {
        try {
          const response = await window.solana.connect();
          setPublicKey(response.publicKey.toString());
        } catch (err) {
          console.error("Phantom Wallet connection failed:", err);
        }
      } else {
        alert("Phantom Wallet not found. Please install it.");
      }
    };

    connectPhantomWallet();
  }, []);

  const handleLogin = async () => {
    if (publicKey) {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicKey }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/');
      } else {
        alert('Login failed');
      }
    } else {
      alert('Phantom Wallet not connected');
    }
  };

  return (
    <div className="min-h-screen h-full flex items-center justify-center">
      <Button onClick={handleLogin}>Login with Phantom Wallet</Button>
    </div>
  );
}
