import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section
      id="Newsletter"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background text-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0  opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 sm:mb-6 text-primary">
            Join the Elite
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto font-light px-4">
            Stay informed about new premium deck releases and limited editions.
            Join our community of cardistry, magic, and card game enthusiasts!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50 h-12 sm:h-14 text-base sm:text-lg rounded-lg"
            />
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-serif font-semibold px-6 sm:px-8 py-3 sm:py-4 h-12 sm:h-14 text-base sm:text-lg hover:shadow-lg transition-all whitespace-nowrap">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary-foreground" />
              Subscribe
            </Button>
          </div>
          <div className="mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-muted-foreground italic px-4">
              Premium playing cards • For cardistry, magic & games • Excellence
              in every deck
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
