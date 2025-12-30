import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Shield, Sparkles, Award } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Qualité Premium",
    description:
      "Papier de haute qualité avec finition mate et dorure élégante.",
  },
  {
    icon: Shield,
    title: "Fabrication Artisanale",
    description: "Chaque deck est créé à la main avec soin et précision.",
  },
  {
    icon: Sparkles,
    title: "Édition Limitée",
    description: "Collections exclusives et numérotées pour collectionneurs.",
  },
  {
    icon: Award,
    title: "Design Unique",
    description:
      "Illustrations originales et positionnement luxe pour le jeu et la magie.",
  },
];

export default function WhySpecial() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Pourquoi ces cartes sont spéciales ?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <feature.icon className="w-16 h-16 mx-auto mb-6 text-primary" />
                <CardTitle className="text-xl font-serif text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
