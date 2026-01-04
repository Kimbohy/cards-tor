"use client";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createSerializer, parseAsBoolean } from "nuqs";
import { MiniNavTrigger } from "./MiniNavTrigger";

const serializeAuthParams = createSerializer({
  login: parseAsBoolean,
});

// Navigation configuration
const NAV_CONFIG = {
  logo: {
    light: "/fullLogo.svg",
    dark: "/fullLogo-dark.svg",
    alt: "Logo",
    width: 210,
    height: 210,
  },
  links: [
    {
      label: "Decks",
      href: "/decks",
    },
  ],
  auth: {
    register: {
      label: "Register",
      getHref: () => serializeAuthParams("/auth", { login: false }),
    },
    signIn: {
      label: "Sign In",
      href: "/auth",
    },
  },
  icons: [
    {
      Icon: Search,
      label: "Search",
    },
    {
      Icon: ShoppingCart,
      label: "Shopping Cart",
    },
  ],
  miniNavTrigger: {
    scrollThreshold: 96,
  },
};

const Nav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLanding = pathname === "/" || pathname === "";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > NAV_CONFIG.miniNavTrigger.scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const registerHref = NAV_CONFIG.auth.register.getHref();
  const signInHref = NAV_CONFIG.auth.signIn.href;

  return (
    <>
      {/* Mini Nav Trigger - Appears after scrolling */}
      <MiniNavTrigger
        session={session}
        isVisible={isScrolled}
        navConfig={NAV_CONFIG}
      />

      {/* Main Navigation */}
      <nav
        className={cn(
          "flex justify-between items-center w-full z-50 absolute top-0 left-0 p-9 pb-0",
          !isLanding && "text-primary"
        )}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src={NAV_CONFIG.logo.light}
            alt={NAV_CONFIG.logo.alt}
            width={NAV_CONFIG.logo.width}
            height={NAV_CONFIG.logo.height}
            className={cn(
              "w-32 sm:w-40 md:w-48 lg:w-52 h-auto",
              !isLanding ? "hidden dark:block" : ""
            )}
          />
          {!isLanding && (
            <Image
              src={NAV_CONFIG.logo.dark}
              alt={NAV_CONFIG.logo.alt}
              width={NAV_CONFIG.logo.width}
              height={NAV_CONFIG.logo.height}
              className="w-32 sm:w-40 md:w-48 lg:w-52 h-auto block dark:hidden"
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 xl:gap-20 items-center">
          {NAV_CONFIG.icons.map(({ Icon, label }) => (
            <Icon
              key={label}
              size={28}
              className={cn(
                "text-primary cursor-pointer hover:opacity-80 transition-opacity",
                isLanding && "text-white"
              )}
            />
          ))}
          {NAV_CONFIG.links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-2xl xl:text-3xl hover:opacity-80 transition-opacity",
                isLanding && "text-white"
              )}
            >
              {label}
            </Link>
          ))}
          {session ? (
            <div className="border-2 rounded-xl px-3 py-1 bg-white/10 flex items-center gap-2">
              <div className="h-7 w-7 border border-amber-50 rounded-full" />
              <span
                className={cn(
                  "text-2xl xl:text-3xl text-primary",
                  isLanding && "text-white"
                )}
              >
                {session.user.name}
              </span>
            </div>
          ) : (
            <>
              <Link
                href={registerHref}
                className={cn(
                  "text-2xl xl:text-3xl hover:opacity-80 transition-opacity",
                  isLanding && "text-white"
                )}
              >
                {NAV_CONFIG.auth.register.label}
              </Link>
              <Link
                href={signInHref}
                className={cn(
                  "text-2xl xl:text-3xl hover:opacity-80 transition-opacity",
                  isLanding && "text-white"
                )}
              >
                {NAV_CONFIG.auth.signIn.label}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-3 sm:gap-4">
          {NAV_CONFIG.icons.map(({ Icon, label }) => (
            <Icon
              key={label}
              size={24}
              className={cn(
                "text-primary cursor-pointer",
                isLanding && "text-white"
              )}
            />
          ))}
          <MobileMenu
            session={session}
            registerHref={registerHref}
            signInHref={signInHref}
            isLanding={isLanding}
          />
        </div>
      </nav>
    </>
  );
};

function MobileMenu({
  session,
  registerHref,
  signInHref,
  isLanding,
}: {
  session: any;
  registerHref: string;
  signInHref: string;
  isLanding: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu
          size={24}
          className={cn(
            "text-primary cursor-pointer",
            isLanding && "text-white"
          )}
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primary font-serif text-2xl">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 mt-8 mx-3">
          {NAV_CONFIG.links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xl font-serif hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
          {session ? (
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <div className="h-8 w-8 border border-primary rounded-full" />
              <span className="text-lg font-serif">{session.user.name}</span>
            </div>
          ) : (
            <>
              <Link
                href={registerHref}
                className="text-xl font-serif hover:text-primary transition-colors"
              >
                {NAV_CONFIG.auth.register.label}
              </Link>
              <Link
                href={signInHref}
                className="text-xl font-serif hover:text-primary transition-colors"
              >
                {NAV_CONFIG.auth.signIn.label}
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Nav;
