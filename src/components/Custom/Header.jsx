"use client";

import { useMemo, useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Home, MenuIcon, Target, Telescope, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import DropDownMenuCustom from "./_header_footer_components/header_dropdown";
import DiscoverDropDown from "./_header_footer_components/discover_dropdown";

const Header = () => {
  const { publicKey } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setWalletConnected(!!publicKey);
  }, [publicKey]);

  useEffect(() => {
    setIsClient(true); // Set this flag when the component is mounted on the client
  }, []);

  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: <Home className="w-4 h-4" />,
    },
    {
      title: "Discover",
      url: "/discover",
      icon: <Telescope className="w-4 h-6" />,
    },
    {
      title: "Project",
      url: "/project",
      icon: <Target className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-black text-white p-4 sticky top-0 z-10">
      <div className="hidden lg:flex justify-between items-center">
        <div className="brandImage">
          <Link href="/">
            <Image src="/Logo.png" height={500} width={500} alt="Alchemy Logo" className="w-56 h-auto" />
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <ul className="space-x-6 flex">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" /> Home
            </Link>
            <DiscoverDropDown />
            <Link href="/project" className="flex items-center gap-2">
              <Target className="w-4 h-4" /> Project
            </Link>
          </ul>
          {isClient && <WalletMultiButton />}
          {walletConnected && isClient && (
            <>
              <DropDownMenuCustom />
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center lg:hidden relative">
        <div className="brandImage">
          <Image src="/Logo.png" height={500} width={500} alt="Alchemy Logo" className="w-56 h-auto" />
        </div>
        <div>
          <Button className="bg-white text-black hover:bg-white" onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon />
          </Button>
        </div>
        <div className={`fixed w-full bg-white min-h-screen top-0 ${showMenu ? "right-0" : "right-[-50000px]"} p-10 transition-all`}>
          <div className="flex flex-col items-end justify-between">
            <Button variant={"link"} onClick={() => setShowMenu(!showMenu)}>
              <X />
            </Button>
            <div>
              <ul className="text-end mt-20 space-y-11">
                {menuItems.map(({ title, url }, index) => (
                  <li key={index}>
                    <Link href={url} className="text-black">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
              {isClient && <WalletMultiButton />}
              {walletConnected && isClient && (
                <Link className="text-black my-10" href="/profile">
                  Your Profile
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
