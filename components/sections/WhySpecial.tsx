import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Shield, Sparkles, Award } from "lucide-react";
import ThemTrigger from "../Them-trigger";

const features = [
  {
    icon: Star,
    title: "Premium Productions",
    description:
      "High-quality playing cards from renowned premium manufacturers.",
  },
  {
    icon: Shield,
    title: "Professional Grade",
    description:
      "Cards designed specifically for cardistry, magic, and card games.",
  },
  {
    icon: Sparkles,
    title: "Limited Edition",
    description: "Exclusive and numbered collections for collectors.",
  },
  {
    icon: Award,
    title: "Unique Design",
    description: "Original illustrations perfect for performance and play.",
  },
];

export default function WhySpecial() {
  return (
    <section id="WhySpecial" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Why are these cards special?
          </h2>
          <ThemTrigger />
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center bg-card border-border hover:border-primary hover:shadow-lg backdrop-blur-sm"
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
