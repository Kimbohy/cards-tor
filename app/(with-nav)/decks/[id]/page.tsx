import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Sparkles,
  Shield,
  Package,
  Palette,
  Zap,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";

// Enum matching Prisma schema
enum KeyFeatureType {
  QUALITY = "QUALITY",
  DESIGN = "DESIGN",
  USABILITY = "USABILITY",
  DURABILITY = "DURABILITY",
  UNIQUENESS = "UNIQUENESS",
  PRODUCTION = "PRODUCTION",
  PRICE = "PRICE",
}

// Type definitions matching schema
type KeyFeature = {
  id: string;
  title: string;
  detail: string | null;
  type: KeyFeatureType;
  createdAt: Date;
  updatedAt: Date;
};

type DeckKeyFeature = {
  deckId: string;
  keyFeatureId: string;
  createdAt: Date;
  updatedAt: Date;
  keyFeature: KeyFeature;
};

// Helper to get icon based on feature type
const getFeatureIcon = (type: KeyFeatureType): LucideIcon => {
  switch (type) {
    case KeyFeatureType.QUALITY:
      return Star;
    case KeyFeatureType.DESIGN:
      return Palette;
    case KeyFeatureType.USABILITY:
      return Zap;
    case KeyFeatureType.DURABILITY:
      return Shield;
    case KeyFeatureType.UNIQUENESS:
      return Sparkles;
    case KeyFeatureType.PRODUCTION:
      return Package;
    case KeyFeatureType.PRICE:
      return DollarSign;
    default:
      return Star;
  }
};

// Mock data based on Deck schema
const mockDecks = [
  {
    id: "1",
    name: "Black Luxury Deck",
    description:
      "Premium deck with elegant black finish, perfect for cardistry and magic performances. This deck features a sophisticated design with smooth handling characteristics that make it ideal for both practice and performance. The premium card stock ensures durability while maintaining the flexibility needed for advanced cardistry moves.",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    images: [
      {
        id: "img1-1",
        deckId: "1",
        url: "/images/aditya-chinchure-oifLHPCN4Vs-unsplash.jpg",
        altText: "Black Luxury Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "img1-2",
        deckId: "1",
        url: "/images/sven-ciupka-8H3cWNtBpdQ-unsplash.jpg",
        altText: "Black Luxury Deck Detail",
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
    keyFeatures: [
      {
        deckId: "1",
        keyFeatureId: "kf1",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf1",
          title: "Premium Quality",
          detail: "Professional-grade card stock from top manufacturers",
          type: KeyFeatureType.QUALITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "1",
        keyFeatureId: "kf2",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf2",
          title: "Elegant Design",
          detail: "Sophisticated black finish with premium aesthetics",
          type: KeyFeatureType.DESIGN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "1",
        keyFeatureId: "kf3",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf3",
          title: "Performance Ready",
          detail: "Optimized for cardistry and magic performances",
          type: KeyFeatureType.USABILITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "1",
        keyFeatureId: "kf4",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf4",
          title: "Long-lasting",
          detail: "Built to withstand intensive practice and use",
          type: KeyFeatureType.DURABILITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    id: "2",
    name: "Red Magic Deck",
    description:
      "Perfect for magic performances and cardistry with smooth handling. Designed with magicians in mind, this deck offers exceptional control and visual appeal. The vibrant red design creates stunning fans and spreads while maintaining professional quality for close-up magic.",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    images: [
      {
        id: "img2-1",
        deckId: "2",
        url: "/images/sven-ciupka-HyjpI3rEGGE-unsplash.jpg",
        altText: "Red Magic Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "img2-2",
        deckId: "2",
        url: "/images/scott-gummerson-WwAUvVTb2Cw-unsplash.jpg",
        altText: "Red Magic Deck Spread",
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
    keyFeatures: [
      {
        deckId: "2",
        keyFeatureId: "kf5",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf5",
          title: "Magic Optimized",
          detail: "Designed specifically for magic performances",
          type: KeyFeatureType.USABILITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "2",
        keyFeatureId: "kf6",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf6",
          title: "Vibrant Design",
          detail: "Eye-catching red design for stunning visuals",
          type: KeyFeatureType.DESIGN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "2",
        keyFeatureId: "kf7",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf7",
          title: "Premium Production",
          detail: "From renowned playing card manufacturers",
          type: KeyFeatureType.PRODUCTION,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    id: "3",
    name: "Gold Collection Deck",
    description:
      "Collector's edition with premium quality, ideal for card games and display. This limited edition deck features luxurious gold accents and intricate details that make it a centerpiece of any collection. Professional grade quality meets stunning visual design.",
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
    images: [
      {
        id: "img3-1",
        deckId: "3",
        url: "/images/sven-ciupka-WbosA2fQy_o-unsplash.jpg",
        altText: "Gold Collection Deck",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "img3-2",
        deckId: "3",
        url: "/images/me-3TvYN65Vi_0-unsplash.jpg",
        altText: "Gold Collection Deck Detail",
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
    keyFeatures: [
      {
        deckId: "3",
        keyFeatureId: "kf8",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf8",
          title: "Limited Edition",
          detail: "Exclusive collector's piece with numbered edition",
          type: KeyFeatureType.UNIQUENESS,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "3",
        keyFeatureId: "kf9",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf9",
          title: "Luxury Quality",
          detail: "Premium materials with gold accents",
          type: KeyFeatureType.QUALITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "3",
        keyFeatureId: "kf10",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf10",
          title: "Stunning Design",
          detail: "Intricate details and luxurious aesthetics",
          type: KeyFeatureType.DESIGN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    id: "4",
    name: "Classic Blue Deck",
    description:
      "Traditional design meets premium quality for cardistry enthusiasts. A timeless deck that combines classic aesthetics with modern manufacturing standards. Perfect for daily practice and performances alike.",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    images: [
      {
        id: "img4-1",
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
    keyFeatures: [
      {
        deckId: "4",
        keyFeatureId: "kf11",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf11",
          title: "Classic Design",
          detail: "Timeless aesthetics with modern quality",
          type: KeyFeatureType.DESIGN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "4",
        keyFeatureId: "kf12",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf12",
          title: "Great Value",
          detail: "Premium quality at an accessible price point",
          type: KeyFeatureType.PRICE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    id: "5",
    name: "Vintage Style Deck",
    description:
      "Nostalgic design with modern quality standards for magic and card games. This deck brings back the charm of vintage playing cards while incorporating contemporary printing and materials technology.",
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-02-28"),
    images: [
      {
        id: "img5-1",
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
    keyFeatures: [
      {
        deckId: "5",
        keyFeatureId: "kf13",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf13",
          title: "Vintage Aesthetic",
          detail: "Nostalgic charm with contemporary quality",
          type: KeyFeatureType.DESIGN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "5",
        keyFeatureId: "kf14",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf14",
          title: "Modern Standards",
          detail: "Latest printing and materials technology",
          type: KeyFeatureType.PRODUCTION,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
  {
    id: "6",
    name: "Midnight Edition Deck",
    description:
      "Dark, mysterious design perfect for magic performances and cardistry. The sleek black design creates an air of sophistication and mystery, making every performance memorable.",
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-03-12"),
    images: [
      {
        id: "img6-1",
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
    keyFeatures: [
      {
        deckId: "6",
        keyFeatureId: "kf15",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf15",
          title: "Mysterious Design",
          detail: "Dark, captivating aesthetics for performances",
          type: KeyFeatureType.DESIGN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "6",
        keyFeatureId: "kf16",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf16",
          title: "Performance Excellence",
          detail: "Perfect for magic and cardistry showcases",
          type: KeyFeatureType.USABILITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      {
        deckId: "6",
        keyFeatureId: "kf17",
        createdAt: new Date(),
        updatedAt: new Date(),
        keyFeature: {
          id: "kf17",
          title: "Premium Build",
          detail: "High-quality production standards",
          type: KeyFeatureType.QUALITY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ],
  },
];

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Find the deck in mock data
  const deck = mockDecks.find((d) => d.id === id);

  if (!deck) {
    notFound();
  }

  const mainImage = deck.images[0];
  const price = deck.prices[0];
  const isNew =
    new Date().getTime() - deck.createdAt.getTime() < 30 * 24 * 60 * 60 * 1000;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-4 sm:pt-6 md:pt-8">
        <Link href="/decks">
          <Button
            variant="outline"
            className="group border-border hover:border-primary text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Decks
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <section className="py-6 sm:py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Images */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative overflow-hidden rounded-lg border border-border">
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText || deck.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                {isNew && (
                  <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-primary-foreground font-semibold px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base">
                    New Arrival
                  </Badge>
                )}
              </div>

              {/* Additional Images */}
              {deck.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {deck.images.slice(1).map((image) => (
                    <div
                      key={image.id}
                      className="relative overflow-hidden rounded-lg border border-border"
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || deck.name}
                        width={300}
                        height={200}
                        className="w-full h-24 sm:h-32 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
                  {deck.name}
                </h1>
                <div className="w-20 sm:w-24 h-1 bg-primary mb-4 sm:mb-6"></div>
                <p className="text-2xl sm:text-3xl font-serif font-light text-foreground mb-4 sm:mb-6">
                  €{price.amount}
                  <span className="text-xs sm:text-sm text-muted-foreground ml-2">
                    {price.currency}
                  </span>
                </p>
              </div>

              <Separator className="bg-border" />

              <div>
                <h2 className="text-lg sm:text-xl font-serif font-semibold mb-3 sm:mb-4 text-foreground">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {deck.description}
                </p>
              </div>

              <Separator className="bg-border" />

              {/* Key Features */}
              {deck.keyFeatures && deck.keyFeatures.length > 0 && (
                <div>
                  <h2 className="text-lg sm:text-xl font-serif font-semibold mb-4 sm:mb-6 text-foreground">
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {deck.keyFeatures.map((deckKeyFeature) => {
                      const feature = deckKeyFeature.keyFeature;
                      const FeatureIcon = getFeatureIcon(feature.type);

                      return (
                        <Card
                          key={feature.id}
                          className="bg-card border-border p-3 sm:p-4"
                        >
                          <CardContent className="p-0 flex items-start space-x-3 sm:space-x-4">
                            <div className="shrink-0">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center">
                                <FeatureIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-serif font-semibold text-foreground mb-1 text-sm sm:text-base">
                                {feature.title}
                              </h3>
                              {feature.detail && (
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  {feature.detail}
                                </p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              <Separator className="bg-border" />

              {/* CTA */}
              <div className="space-y-3 sm:space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-serif font-semibold py-5 sm:py-6 text-base sm:text-lg">
                  Add to Cart
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
                  Free shipping on orders over €100 • 30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-light mb-6 sm:mb-8 text-center text-primary">
              Perfect For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <Card className="text-center p-4 sm:p-6 bg-card border-border">
                <CardContent className="p-0">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-primary" />
                  <h3 className="font-serif font-semibold text-foreground mb-2 text-base sm:text-lg">
                    Cardistry
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Smooth handling for flourishes and complex moves
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-4 sm:p-6 bg-card border-border">
                <CardContent className="p-0">
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-primary" />
                  <h3 className="font-serif font-semibold text-foreground mb-2 text-base sm:text-lg">
                    Magic
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Professional quality for stunning performances
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-4 sm:p-6 bg-card border-border">
                <CardContent className="p-0">
                  <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-primary" />
                  <h3 className="font-serif font-semibold text-foreground mb-2 text-base sm:text-lg">
                    Card Games
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Premium feel for your favorite games
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
