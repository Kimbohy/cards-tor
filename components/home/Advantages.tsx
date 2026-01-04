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
    <section
      id="Advantages"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Advantages & Guarantees of Excellence
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-accent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className="text-center p-4 sm:p-6 md:p-8 bg-card backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-accent/10 transition-colors">
                  <advantage.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-accent" />
                </div>
                <h3 className="font-serif font-semibold mb-3 sm:mb-4 text-foreground text-lg sm:text-xl">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
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
