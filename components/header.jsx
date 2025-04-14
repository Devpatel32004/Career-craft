import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  StarsIcon,
} from "lucide-react";
import { checkUser } from "@/lib/checkuser";

const Header = async () => {
  await checkUser();
  return (
    <div className="px-2 mx-auto md:px-8 h-16 flex justify-between">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="sensai-logo"
            width={140}
            height={30}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>
      </div>
      <div className="gap-x-2 md:gap-x-4 flex items-center">
        <SignedIn>
          <Link href="/dashboard">
            <Button variant={"outline"} className="flex gap-2 items-center">
              <LayoutDashboard className="size-4" />
              <span className="hidden md:inline-flex cursor-pointer">Industy Insights</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex gap-2 items-center cursor-pointer">
                <StarsIcon className="size-4" />
                <span className="hidden md:block">Growth Tools</span>
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-38">
              <DropdownMenuItem asChild>
                <Link href="/interview" className="flex items-center gap-2">
                  <GraduationCap className="size-4" />
                  <span>Interview Prep</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-15 h-15",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
