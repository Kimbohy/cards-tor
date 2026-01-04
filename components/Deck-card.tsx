import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Image from "next/image";

function DeckCard({ deck }: { deck: any }) {
  const mainImage = deck.images[0];
  const price = deck.prices[0];
  const isNew =
    new Date().getTime() - deck.createdAt.getTime() < 30 * 24 * 60 * 60 * 1000;
  return (
    <Link href={`/decks/${deck.id}`}>
      <Card className="overflow-hidden bg-card border-border hover:border-accent hover:shadow-lg backdrop-blur-sm group transition-all duration-300">
        <div className="relative overflow-hidden">
          <Image
            src={mainImage.url}
            alt={mainImage.altText || deck.name}
            width={400}
            height={300}
            className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
          {isNew && (
            <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-primary-foreground font-semibold px-2.5 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm">
              New
            </Badge>
          )}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
            <p className="text-2xl sm:text-3xl font-serif font-light text-white">
              €{price.amount}
            </p>
          </div>
        </div>
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-serif text-foreground">
            {deck.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-2">
            {deck.description}
          </p>
          <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-2.5 sm:py-3">
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

export default DeckCard;
