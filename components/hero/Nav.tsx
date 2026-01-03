"use client";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Nav = ({ variant }: { variant?: "Landing" | "Default" }) => {
  const { data: session } = useSession();
  return (
    <div
      className={cn(
        "flex justify-between w-full",
        variant === "Landing" ? "" : "text-primary"
      )}
    >
      <Image
        src="/fullLogo.svg"
        alt="Logo"
        width={210}
        height={210}
        className={variant === "Landing" ? "" : "hidden dark:block"}
      />

      {variant !== "Landing" && (
        <Image
          src="/fullLogo-dark.svg"
          alt="Logo"
          width={210}
          height={210}
          className="block dark:hidden"
        />
      )}
      <div className="flex gap-28 items-center">
        <Search size={30} className="text-primary" />
        <ShoppingCart size={30} className="text-primary" />
        <Link href="/decks" className="text-3xl">
          Decks
        </Link>
        {session ? (
          <div className="border-2 rounded-xl px-4 py-1 bg-white/10 flex items-center gap-2">
            <div className="h-8 w-8 border border-amber-50 rounded-full" />
            <span className="text-3xl ">{session.user.name}</span>
          </div>
        ) : (
          <>
            <Link href="/login" className="text-3xl">
              Register
            </Link>
            <Link href="/login" className="text-3xl">
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
