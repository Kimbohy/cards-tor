import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    role: "Professional Magician",
    content:
      "Premium quality cards perfect for magic performances. They handle beautifully and are built to last.",
    rating: 5,
  },
  {
    name: "Mary Johnson",
    role: "Cardistry Enthusiast",
    content:
      "These decks are perfect for cardistry. The finish and quality make every flourish smooth and visually stunning.",
    rating: 5,
  },
  {
    name: "Peter Williams",
    role: "Card Game Player",
    content:
      "The feel in hand is incredible. Premium playing cards that elevate any card game session.",
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section
      id="SocialProof"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Exceptional Testimonials
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-4 sm:p-6 md:p-8 bg-card backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300 "
            >
              <CardContent className="p-0 relative">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted-foreground/30 absolute top-0 right-0" />
                <div className="flex mb-4 sm:mb-6 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 sm:mb-8 italic text-base sm:text-lg leading-relaxed font-light">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-4 sm:pt-6">
                  <p className="font-serif font-semibold text-foreground text-base sm:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-primary font-medium">
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
