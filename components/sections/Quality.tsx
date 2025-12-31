import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Printer, Clock, CheckCircle } from "lucide-react";

const qualities = [
  {
    icon: FileText,
    title: "Premium Paper",
    description: "300gsm card stock with velvety texture for exceptional feel.",
  },
  {
    icon: Printer,
    title: "High Quality Printing",
    description: "Offset printing technology with vegetable-based inks.",
  },
  {
    icon: Clock,
    title: "Durability",
    description: "Wear resistance and perfect preservation over time.",
  },
  {
    icon: CheckCircle,
    title: "Certification",
    description: "Certified materials and environmentally friendly processes.",
  },
];

export default function Quality() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Quality & Exceptional Craftsmanship
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {qualities.map((quality, index) => (
            <Card
              key={index}
              className="flex items-start space-x-6 p-8 bg-card backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="shrink-0">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <quality.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <CardTitle className="mb-4 text-xl font-serif text-foreground">
                  {quality.title}
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed text-lg">
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
