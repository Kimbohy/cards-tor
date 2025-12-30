import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="w-20 h-20 mx-auto mb-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-primary">
            Rejoignez l'Élite
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Sois informé des nouvelles éditions limitées et découvre en
            exclusivité nos dernières créations. Rejoins notre communauté de
            passionnés d'exception !
          </p>
          <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50 h-14 text-lg rounded-lg"
            />
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-serif font-semibold px-8 py-4 h-14 text-lg transition-all duration-300 hover:shadow-lg">
              <Mail className="w-5 h-5 mr-2" />
              S'inscrire
            </Button>
          </div>
          <div className="mt-8">
            <p className="text-sm text-muted-foreground italic">
              Rejoignez l'exclusivité • Découvrez l'art du jeu • Vivez
              l'expérience premium
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
