import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton } from "@clerk/nextjs";
import { PencilLine, User, UserCheck } from "lucide-react";
import Link from "next/link";

export default function DropDownMenuCustom() {
  const dropdownOptions = [
    {
      title: "Your Profile",
      url: "/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      title: "Update Profile",
      url: "/update-profile",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      title: "Publish Blogs",
      url: "/publish-blog",
      icon: <PencilLine className="w-4 h-4" />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Profile</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-6 w-56 mr-16 bg-[#131313] text-white border-[#131313]">
        <div className="flex items-center justify-between gap-3">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <UserButton />
        </div>
        <DropdownMenuSeparator className="mt-2 mb-4" />
        {dropdownOptions.map(({ title, url, icon }, index) => {
          return (
            <DropdownMenuItem className="cursor-pointer" asChild key={index}>
              <Link href={"/profile"} className="flex items-center gap-3">
                {icon} {title}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
