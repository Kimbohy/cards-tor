import { Card, CardContent } from "@/components/ui/card";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const advantages = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Shipping within 24-48h with real-time tracking.",
  },
  {
    icon: RotateCcw,
    title: "Return Policy",
    description: "Free return within 30 days if not satisfied.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "SSL encryption and reliable payment methods.",
  },
  {
    icon: Headphones,
    title: "Customer Service",
    description: "Support available 7/7 for your questions.",
  },
];

export default function Advantages() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Advantages & Guarantees of Excellence
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className="text-center p-8 bg-card backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-muted/80 transition-colors duration-300">
                  <advantage.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif font-semibold mb-4 text-foreground text-xl">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {advantage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
