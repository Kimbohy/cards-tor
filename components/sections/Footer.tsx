import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Crown } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-8 sm:py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <Image
            src="/cards.svg"
            alt="Crown"
            width={80}
            height={80}
            className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 hidden dark:block"
          />
          <Image
            src="/cards_dark.svg"
            alt="Crown"
            width={80}
            height={80}
            className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 block dark:hidden"
          />
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-primary mb-2">
            Cards-Tor
          </h3>
          <p className="text-muted-foreground font-light text-base sm:text-lg max-w-md mx-auto px-4">
            Exceptional cards for gaming and magic enthusiasts.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-4 sm:mb-6 text-primary text-base sm:text-lg">
              Products
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Luxury Decks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Limited Editions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-4 sm:mb-6 text-primary text-base sm:text-lg">
              Support
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-4 sm:mb-6 text-primary text-base sm:text-lg">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-start space-x-4 sm:space-x-6">
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-4 sm:mb-6 text-primary text-base sm:text-lg">
              Newsletter
            </h4>
            <p className="text-muted-foreground font-light text-xs sm:text-sm leading-relaxed px-4 md:px-0">
              Stay informed about the latest creations and limited editions.
            </p>
          </div>
        </div>
        <Separator className="bg-border mb-6 sm:mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-xs sm:text-sm gap-4 md:gap-0">
          <p className="font-light text-center md:text-left">
            &copy; 2025 Cards-Tor. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8 text-center">
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 font-light"
            >
              Legal Notice
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 font-light"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
