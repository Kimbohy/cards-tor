import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Mock data based on Deck schema
const mockDecks = [
  {
    id: "1",
    name: "Black Luxury Deck",
    description:
      "Premium deck with elegant black finish, perfect for cardistry and magic performances.",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    images: [
      {
        id: "img1",
        deckId: "1",
        url: "/images/aditya-chinchure-oifLHPCN4Vs-unsplash.jpg",
        altText: "Black Luxury Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    prices: [
      {
        id: "price1",
        deckId: "1",
        amount: 89,
        currency: "EUR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "2",
    name: "Red Magic Deck",
    description:
      "Perfect for magic performances and cardistry with smooth handling.",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    images: [
      {
        id: "img2",
        deckId: "2",
        url: "/images/sven-ciupka-HyjpI3rEGGE-unsplash.jpg",
        altText: "Red Magic Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    prices: [
      {
        id: "price2",
        deckId: "2",
        amount: 75,
        currency: "EUR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "3",
    name: "Gold Collection Deck",
    description:
      "Collector's edition with premium quality, ideal for card games and display.",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
    images: [
      {
        id: "img3",
        deckId: "3",
        url: "/images/sven-ciupka-WbosA2fQy_o-unsplash.jpg",
        altText: "Gold Collection Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    prices: [
      {
        id: "price3",
        deckId: "3",
        amount: 120,
        currency: "EUR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "4",
    name: "Classic Blue Deck",
    description:
      "Traditional design meets premium quality for cardistry enthusiasts.",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    images: [
      {
        id: "img4",
        deckId: "4",
        url: "/images/amanda-jones-P787-xixGio-unsplash.jpg",
        altText: "Classic Blue Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    prices: [
      {
        id: "price4",
        deckId: "4",
        amount: 65,
        currency: "EUR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "5",
    name: "Vintage Style Deck",
    description:
      "Nostalgic design with modern quality standards for magic and card games.",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-02-28"),
    images: [
      {
        id: "img5",
        deckId: "5",
        url: "/images/jack-b-ombUn7ergE4-unsplash.jpg",
        altText: "Vintage Style Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    prices: [
      {
        id: "price5",
        deckId: "5",
        amount: 55,
        currency: "EUR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "6",
    name: "Midnight Edition Deck",
    description:
      "Dark, mysterious design perfect for magic performances and cardistry.",
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-03-12"),
    images: [
      {
        id: "img6",
        deckId: "6",
        url: "/images/scott-gummerson-Rcc8-iejcRg-unsplash.jpg",
        altText: "Midnight Edition Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    prices: [
      {
        id: "price6",
        deckId: "6",
        amount: 95,
        currency: "EUR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];

export default function DecksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-6 text-primary">
              Premium Playing Card Decks
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our collection of premium playing cards designed for
              cardistry, magic, and card games. Each deck is carefully selected
              from top manufacturers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Decks Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockDecks.map((deck) => {
              const mainImage = deck.images[0];
              const price = deck.prices[0];
              const isNew =
                new Date().getTime() - deck.createdAt.getTime() <
                30 * 24 * 60 * 60 * 1000; // Less than 30 days old

              return (
                <Link href={`/decks/${deck.id}`} key={deck.id}>
                  <Card className="overflow-hidden bg-card border-border hover:border-primary hover:shadow-lg backdrop-blur-sm group transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={mainImage.url}
                        alt={mainImage.altText || deck.name}
                        width={400}
                        height={300}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                      {isNew && (
                        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-semibold px-3 py-1">
                          New
                        </Badge>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-3xl font-serif font-light text-white">
                          €{price.amount}
                        </p>
                      </div>
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl font-serif text-foreground">
                        {deck.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                        {deck.description}
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-3">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
