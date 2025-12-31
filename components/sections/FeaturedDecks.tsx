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
    <section id="FeaturedDecks" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Featured Decks / Best Sellers
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {decks.map((deck) => (
            <Card
              key={deck.id}
              className="overflow-hidden bg-card border-border hover:border-primary  hover:shadow-lg backdrop-blur-sm group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={deck.image}
                  alt={deck.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-semibold px-3 py-1">
                  {deck.badge}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-3xl font-serif font-light text-primary">
                    {deck.price}
                  </p>
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-serif text-foreground">
                  {deck.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {deck.description}
                </p>
                <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-3 ">
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
