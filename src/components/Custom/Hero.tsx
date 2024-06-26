"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function Hero() {
  const user = useUser();
  return (
    <div className="bg-[#131313] text-white min-h-[500px] flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center">Explore What Community Posts</h1>
      <div className="mt-10 space-x-6">
        <Button variant={"outline"} className="text-black">
          Explore Blogs
        </Button>

        {user ? (
          <Button variant={"outline"} className="text-black">
            Your Profile
          </Button>
        ) : (
          <Button className="text-white">Create an Account</Button>
        )}
      </div>
    </div>
  );
}
