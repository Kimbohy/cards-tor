"use client";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DrawnIcon } from "@/components/DrawnIcon";
import Image from "next/image";

interface MiniNavTriggerProps {
  session: any;
  isVisible: boolean;
  navConfig: {
    links: Array<{ label: string; href: string }>;
    auth: {
      register: { label: string; getHref: () => string };
      signIn: { label: string; href: string };
    };
  };
}

export function MiniNavTrigger({
  session,
  isVisible,
  navConfig,
}: MiniNavTriggerProps) {
  const registerHref = navConfig.auth.register.getHref();
  const signInHref = navConfig.auth.signIn.href;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{
            duration: 0.3,
          }}
          className="fixed bottom-24 right-6 z-50"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="h-16 w-16 rounded-full shadow-lg bg-primary-foreground text-primary dark:hover:bg-accent"
              >
                <DrawnIcon type="menu" size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-primary font-serif text-2xl">
                  <Image
                    src="/fullLogo.svg"
                    alt="Logo"
                    width={210}
                    height={60}
                    className="w-48 h-auto hidden dark:block"
                  />
                  <Image
                    src="/fullLogo-dark.svg"
                    alt="Logo"
                    width={210}
                    height={60}
                    className="w-48 h-auto block dark:hidden"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8 mx-3">
                {navConfig.links.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-xl font-serif hover:text-accent transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                {session ? (
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="h-8 w-8 border border-accent rounded-full" />
                    <span className="text-lg font-serif">
                      {session.user.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <Link
                      href={registerHref}
                      className="text-xl font-serif hover:text-accent transition-colors"
                    >
                      {navConfig.auth.register.label}
                    </Link>
                    <Link
                      href={signInHref}
                      className="text-xl font-serif hover:text-accent transition-colors"
                    >
                      {navConfig.auth.signIn.label}
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
