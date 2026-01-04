import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DeckCard from "../Deck-card";

const decks = [
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
            <DeckCard deck={deck} key={deck.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
