import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Crown } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Image
            src="/cards.svg"
            alt="Crown"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h3 className="font-serif text-3xl font-light text-primary mb-2">
            Cards-Tor
          </h3>
          <p className="text-muted-foreground font-light text-lg max-w-md mx-auto">
            Exceptional cards for gaming and magic enthusiasts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-6 text-primary text-lg">
              Products
            </h4>
            <ul className="space-y-3 text-muted-foreground">
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
            <h4 className="font-serif font-semibold mb-6 text-primary text-lg">
              Support
            </h4>
            <ul className="space-y-3 text-muted-foreground">
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
            <h4 className="font-serif font-semibold mb-6 text-primary text-lg">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-start space-x-6">
              <Facebook className="w-6 h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
              <Instagram className="w-6 h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
              <Twitter className="w-6 h-6 hover:text-primary cursor-pointer transition-colors duration-300" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-6 text-primary text-lg">
              Newsletter
            </h4>
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              Stay informed about the latest creations and limited editions.
            </p>
          </div>
        </div>
        <Separator className="bg-border mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p className="font-light">
            &copy; 2025 Cards-Tor. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
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
