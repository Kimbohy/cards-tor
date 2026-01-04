import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Shield, Sparkles, Award } from "lucide-react";

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
    <section
      id="WhySpecial"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background text-foreground"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Why are these cards special?
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-accent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center bg-card border-border hover:border-accent hover:shadow-lg backdrop-blur-sm transition-all duration-300"
            >
              <CardHeader className="pb-4 px-4 sm:px-6">
                <feature.icon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 text-accent" />
                <CardTitle className="text-lg sm:text-xl font-serif text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
