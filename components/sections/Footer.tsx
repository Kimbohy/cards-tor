import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Crown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Crown className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h3 className="font-serif text-2xl font-light text-primary mb-2">
            Cards-Tor
          </h3>
          <p className="text-muted-foreground font-light text-lg max-w-md mx-auto">
            Des cartes d'exception pour les passionnés du jeu et de la magie.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-6 text-primary text-lg">
              Produits
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Decks Luxe
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Éditions Limitées
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Accessoires
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
                  Livraison
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300 font-light"
                >
                  Retours
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-serif font-semibold mb-6 text-primary text-lg">
              Suivez-nous
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
              Restez informé des dernières créations et éditions limitées.
            </p>
          </div>
        </div>
        <Separator className="bg-border mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p className="font-light">
            &copy; 2025 Cards-Tor. Tous droits réservés.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 font-light"
            >
              Mentions légales
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 font-light"
            >
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
