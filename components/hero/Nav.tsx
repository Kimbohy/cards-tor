"use client";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
const Nav = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between w-full">
      <Image src="/fullLogo.svg" alt="Logo" width={210} height={210} />
      <div className="flex gap-28 items-center">
        <Image src="/icon/lens.svg" alt="search icon" width={30} height={20} />
        <Image src="/icon/cart.svg" alt="Cart" width={30} height={30} />
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
