import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  PencilLine,
  SquareStack,
  Telescope,
} from "lucide-react";
import Link from "next/link";

export default function DiscoverDropDown() {
  const dropdownOptions = [
    {
      title: "Categories",
      url: "/discover/categories",
      icon: <SquareStack className="w-4 h-4" />,
    },
    {
      title: "Posts",
      url: "/discover",
      icon: <PencilLine className="w-4 h-4" />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-transparent text-white p-0 flex items-center"
          variant={"link"}
        >
          <Telescope className="w-5 h-5 mr-2" />
          Discover <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-6 w-56 mr-16 bg-[#131313] text-white border-[#131313]">
        {dropdownOptions.map(({ title, url, icon }, index) => (
          <DropdownMenuItem className="cursor-pointer" asChild key={index}>
            <Link href={`${url}`} className="flex items-center gap-3">
              {icon} {title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
