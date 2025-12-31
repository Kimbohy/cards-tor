import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    role: "Professional Magician",
    content:
      "These cards are of exceptional quality. They glide perfectly and withstand intensive use.",
    rating: 5,
  },
  {
    name: "Mary Johnson",
    role: "Collector",
    content:
      "The design is magnificent and the limited edition makes each deck unique. A true collector's piece.",
    rating: 5,
  },
  {
    name: "Peter Williams",
    role: "Poker Player",
    content:
      "The feel in hand is incredible. These cards transform the gaming experience.",
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section id="SocialProof" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Exceptional Testimonials
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 bg-card backdrop-blur-sm border-border shadow-lg hover:shadow-xl  hover:-translate-y-2"
            >
              <CardContent className="p-0 relative">
                <Quote className="w-12 h-12 text-muted-foreground/30 absolute top-0 right-0" />
                <div className="flex mb-6 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 italic text-lg leading-relaxed font-light">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-6">
                  <p className="font-serif font-semibold text-foreground text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
