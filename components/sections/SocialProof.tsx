import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jean Dupont",
    role: "Magicien Professionnel",
    content:
      "Ces cartes sont d'une qualité exceptionnelle. Elles glissent parfaitement et résistent à l'usage intensif.",
    rating: 5,
  },
  {
    name: "Marie Leroy",
    role: "Collectionneuse",
    content:
      "Le design est magnifique et l'édition limitée rend chaque deck unique. Une vraie pièce de collection.",
    rating: 5,
  },
  {
    name: "Pierre Martin",
    role: "Joueur de Poker",
    content:
      "Le confort en main est incroyable. Ces cartes transforment l'expérience de jeu.",
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Témoignages d'Exception
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 bg-card backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-0 relative">
                <Quote className="w-12 h-12 text-muted-foreground/30 absolute top-0 right-0" />
                <div className="flex mb-6 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 italic text-lg leading-relaxed font-light">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-6">
                  <p className="font-serif font-semibold text-foreground text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
