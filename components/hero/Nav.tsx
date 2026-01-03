"use client";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Nav = ({ variant }: { variant?: "Landing" | "Default" }) => {
  const { data: session } = useSession();
  return (
    <div
      className={cn(
        "flex justify-between items-center w-full",
        variant === "Landing" ? "" : "text-primary"
      )}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src="/fullLogo.svg"
          alt="Logo"
          width={210}
          height={210}
          className={cn(
            "w-32 sm:w-40 md:w-48 lg:w-52 h-auto",
            variant === "Landing" ? "" : "hidden dark:block"
          )}
        />
        {variant !== "Landing" && (
          <Image
            src="/fullLogo-dark.svg"
            alt="Logo"
            width={210}
            height={210}
            className="w-32 sm:w-40 md:w-48 lg:w-52 h-auto block dark:hidden"
          />
        )}
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-8 xl:gap-20 items-center">
        <Search
          size={28}
          className="text-primary cursor-pointer hover:opacity-80 transition-opacity"
        />
        <ShoppingCart
          size={28}
          className="text-primary cursor-pointer hover:opacity-80 transition-opacity"
        />
        <Link
          href="/decks"
          className="text-2xl xl:text-3xl hover:opacity-80 transition-opacity"
        >
          Decks
        </Link>
        {session ? (
          <div className="border-2 rounded-xl px-3 py-1 bg-white/10 flex items-center gap-2">
            <div className="h-7 w-7 border border-amber-50 rounded-full" />
            <span className="text-2xl xl:text-3xl">{session.user.name}</span>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="text-2xl xl:text-3xl hover:opacity-80 transition-opacity"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-2xl xl:text-3xl hover:opacity-80 transition-opacity"
            >
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden items-center gap-3 sm:gap-4">
        <Search size={24} className="text-primary cursor-pointer" />
        <ShoppingCart size={24} className="text-primary cursor-pointer" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary">
              <Menu size={28} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-primary font-serif text-2xl">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-8">
              <Link
                href="/decks"
                className="text-xl font-serif hover:text-primary transition-colors"
              >
                Decks
              </Link>
              {session ? (
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="h-8 w-8 border border-primary rounded-full" />
                  <span className="text-lg font-serif">
                    {session.user.name}
                  </span>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xl font-serif hover:text-primary transition-colors"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="text-xl font-serif hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Nav;
