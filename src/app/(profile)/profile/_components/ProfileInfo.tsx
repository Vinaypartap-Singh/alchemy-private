"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function ProfileInfo({ data }: any) {
  const user = useUser();
  const userImage = user?.user?.imageUrl;

  return (
    <>
      <div className="flex flex-col justify-between h-full space-y-6">
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-1/2">
            <Image
              width={700}
              height={700}
              className="h-auto max-w-full rounded-lg"
              src={`${userImage}`}
              alt="Profile Image"
            />
          </div>
          <div className="space-y-4 w-full">
            <div>
              <h1 className="text-3xl font-bold">{user?.user?.fullName}</h1>
              <h4 className="mt-2">
                <span className="font-bold">Meaning: </span>Guidance, Good
                Behaviour
              </h4>
              <p className="mt-2">{data.shortIntroduction}</p>
            </div>
          </div>
        </div>
        <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
      </div>
    </>
  );
}
