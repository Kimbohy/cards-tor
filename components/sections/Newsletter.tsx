import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section
      id="Newsletter"
      className="py-24 bg-background text-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="w-20 h-20 mx-auto mb-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-primary">
            Join the Elite
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Stay informed about new limited editions and discover our latest
            creations exclusively. Join our community of exceptional
            enthusiasts!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/50 h-14 text-lg rounded-lg"
            />
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-serif font-semibold px-8 py-4 h-14 text-lg  hover:shadow-lg">
              <Mail className="w-8 h-8 text-primary-foreground" />
              Subscribe
            </Button>
          </div>
          <div className="mt-8">
            <p className="text-sm text-muted-foreground italic">
              Join the exclusivity • Discover the art of gaming • Experience
              premium quality
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
