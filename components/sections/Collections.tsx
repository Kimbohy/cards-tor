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
    description: "Perfect tools for magicians and card manipulators.",
  },
];

export default function Collections() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Exceptional Collections
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="text-center bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg backdrop-blur-sm hover:-translate-y-2 cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-muted/80 transition-colors duration-300">
                  <category.icon className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif text-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
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
