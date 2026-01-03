import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Sparkles, Palette, Wand2 } from "lucide-react";

const categories = [
  {
    icon: Crown,
    title: "Luxury Collection",
    description: "Premium decks for discerning collectors.",
  },
  {
    icon: Sparkles,
    title: "Limited Edition",
    description: "Unique and numbered pieces.",
  },
  {
    icon: Palette,
    title: "Artistic / Illustrated",
    description: "Original creations by talented artists.",
  },
  {
    icon: Wand2,
    title: "Magic / Cardistry Special",
    description:
      "Premium decks designed for magicians, cardistry, and card game players.",
  },
];

export default function Collections() {
  return (
    <section
      id="Collections"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background text-foreground"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Exceptional Collections
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="text-center bg-card border-border hover:border-primary hover:shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            >
              <CardHeader className="pb-4 px-4 sm:px-6">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-muted/80 transition-colors">
                  <category.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-serif text-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
