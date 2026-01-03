import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Printer, Clock, CheckCircle } from "lucide-react";

const qualities = [
  {
    icon: FileText,
    title: "Premium Paper Stock",
    description:
      "Professional-grade card stock optimized for cardistry and magic handling.",
  },
  {
    icon: Printer,
    title: "Top Manufacturers",
    description: "Cards from leading premium playing card producers worldwide.",
  },
  {
    icon: Clock,
    title: "Performance Durability",
    description:
      "Designed to withstand intensive use in cardistry, magic, and gaming.",
  },
  {
    icon: CheckCircle,
    title: "Quality Selection",
    description: "Carefully curated decks meeting professional standards.",
  },
];

export default function Quality() {
  return (
    <section
      id="Quality"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Premium Quality Productions
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {qualities.map((quality, index) => (
            <Card
              key={index}
              className="flex items-start space-x-4 sm:space-x-6 p-4 sm:p-6 md:p-8 bg-card backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center">
                  <quality.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <CardTitle className="mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl font-serif text-foreground">
                  {quality.title}
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                  {quality.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
