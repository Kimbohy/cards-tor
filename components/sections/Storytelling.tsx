import Image from "next/image";

export default function Storytelling() {
  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-primary">
                Notre Histoire d'Excellence
              </h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Cards-Tor est né de la passion pour l'art du jeu de cartes. Nous
              croyons que chaque deck raconte une histoire, et nous nous
              engageons à créer des cartes qui transcendent le simple objet pour
              devenir des œuvres d'art.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Notre vision : offrir des decks premium qui combinent qualité
              artisanale, design innovant et expérience unique pour joueurs,
              magiciens et collectionneurs.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Avec passion et dévouement, nous créons des cartes qui inspirent
              et enchantent.
            </p>
            <div className="pt-4">
              <div className="inline-block border border-border px-6 py-3">
                <p className="text-primary font-serif italic text-lg">
                  "L'art du jeu, élevé à son plus haut niveau"
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-xl"></div>
            <Image
              src="/icon/images/story.jpg" // placeholder
              alt="Notre histoire"
              width={600}
              height={400}
              className="rounded-lg shadow-lg relative z-10 border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
