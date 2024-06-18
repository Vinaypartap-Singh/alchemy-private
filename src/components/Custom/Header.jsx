"use client";
import { Home, MenuIcon, Target, Telescope, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import DropDownMenuCustom from "./_header_footer_components/header_dropdown";
import DiscoverDropDown from "./_header_footer_components/discover_dropdown";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedPublicKey = localStorage.getItem('publicKey');
    if (storedPublicKey) {
      setPublicKey(storedPublicKey);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('publicKey');
    setPublicKey(null);
    router.push('/sign-in');
  };

  const menuItems = [
    {
      title: "Home",
      url: "/",
      icon: <Home className="w-4 h-4" />
    },
    {
      title: "Discover",
      url: "/discover",
      icon: <Telescope className="w-4 h-6" />
    },
    {
      title: "Project",
      url: "/project",
      icon: <Target className="w-4 h-4" />
    }
  ];
  
  return (
    <div className="bg-black text-white p-4 sticky top-0 z-10">
      <div className="hidden lg:flex justify-between items-center">
        <div className="brandImage">
          <a href="#">
            <Image
              src={"/Logo.png"}
              height={500}
              width={500}
              alt="Alchemy Logo"
              className="w-56 h-auto"
            />
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <ul className="space-x-6 flex">
            <Link href={"/"} className="flex items-center gap-2">
              <Home className="w-4 h-4" /> Home
            </Link>
            <DiscoverDropDown />
            <Link href={"/project"} className="flex items-center gap-2">
              <Target className="w-4 h-4" /> Project
            </Link>
          </ul>
          {publicKey ? (
            <div className="space-x-6">
              <span>Welcome, {publicKey}</span>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </div>
          ) : (
            <div className="space-x-6">
              <Button asChild variant="outline" className="text-black">
                <Link href={"/sign-up"}>Create Account</Link>
              </Button>
              <Button asChild>
                <Link href={"/sign-in"}>Log in</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center lg:hidden relative">
        <div className="brandImage">
          <Image
            src={"/Logo.png"}
            height={500}
            width={500}
            alt="Alchemy Logo"
            className="w-56 h-auto"
          />
        </div>
        <div>
          <Button
            className="bg-white text-black hover:bg-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MenuIcon />
          </Button>
        </div>

        <div
          className={`fixed w-full bg-white min-h-screen top-0 ${
            showMenu ? "right-0" : "right-[-50000px]"
          } p-10 transition-all`}
        >
          <div className="flex flex-col items-end justify-between">
            <Button variant={"link"} onClick={() => setShowMenu(!showMenu)}>
              <X />
            </Button>

            <div>
              <ul className="text-end mt-20 space-y-11">
                {menuItems.map(({ title, url }, index) => {
                  return (
                    <li key={index}>
                      <a href={`${url}`} className="text-black">
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {publicKey ? (
              <div className="space-x-6 mt-16">
                <span>Welcome, {publicKey}</span>
                <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
              </div>
            ) : (
              <div className="space-x-6 mt-16">
                <Button asChild variant="outline">
                  <Link href={"/sign-up"}>Create Account</Link>
                </Button>
                <Button asChild>
                  <Link href={"/sign-in"}>Log in</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
