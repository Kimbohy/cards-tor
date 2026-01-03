import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const decks = [
  {
    id: 1,
    name: "Black Luxury Deck",
    price: "€89",
    image: "/images/aditya-chinchure-oifLHPCN4Vs-unsplash.jpg",
    badge: "Best Seller",
    description: "Premium deck with elegant black finish.",
  },
  {
    id: 2,
    name: "Red Magic Deck",
    price: "€75",
    image: "/images/sven-ciupka-HyjpI3rEGGE-unsplash.jpg",
    badge: "Limited",
    description: "Perfect for magic performances and cardistry.",
  },
  {
    id: 3,
    name: "Gold Collection Deck",
    price: "€120",
    image: "/images/sven-ciupka-WbosA2fQy_o-unsplash.jpg",
    badge: "New",
    description: "Collector's edition with 24k gold plating.",
  },
];

export default function FeaturedDecks() {
  return (
    <section
      id="FeaturedDecks"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background text-foreground"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Featured Decks / Best Sellers
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {decks.map((deck) => (
            <Card
              key={deck.id}
              className="overflow-hidden bg-card border-border hover:border-primary hover:shadow-lg backdrop-blur-sm group transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={deck.image}
                  alt={deck.name}
                  width={400}
                  height={300}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-primary-foreground font-semibold px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm">
                  {deck.badge}
                </Badge>
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <p className="text-2xl sm:text-3xl font-serif font-light text-primary">
                    {deck.price}
                  </p>
                </div>
              </div>
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-serif text-foreground">
                  {deck.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  {deck.description}
                </p>
                <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-2.5 sm:py-3">
                  View Deck
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
