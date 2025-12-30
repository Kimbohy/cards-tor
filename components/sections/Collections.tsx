import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Sparkles, Palette, Wand2 } from "lucide-react";

const categories = [
  {
    icon: Crown,
    title: "Collection de Luxe",
    description: "Decks premium pour collectionneurs exigeants.",
  },
  {
    icon: Sparkles,
    title: "Édition Limitée",
    description: "Pièces uniques et numérotées.",
  },
  {
    icon: Palette,
    title: "Artistiques / Illustrées",
    description: "Créations originales d'artistes talentueux.",
  },
  {
    icon: Wand2,
    title: "Spécial Magie / Cardistry",
    description: "Outils parfaits pour magiciens et manipulateurs.",
  },
];

export default function Collections() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Collections d'Exception
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
