import Image from "next/image";

export default function Storytelling() {
  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-primary">
                Our Story of Excellence
              </h2>
              <div className="w-24 h-1 bg-primary mb-8"></div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Cards-Tor was born from a passion for the art of card games. We
              believe that each deck tells a story, and we are committed to
              creating cards that transcend mere objects to become works of art.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Our vision: to offer premium decks that combine artisanal quality,
              innovative design and a unique experience for players, magicians
              and collectors.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              With passion and dedication, we create cards that inspire and
              enchant.
            </p>
            <div className="pt-4">
              <div className="inline-block border border-border px-6 py-3">
                <p className="text-primary font-serif italic text-lg">
                  "The art of gaming, elevated to its highest level"
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-transparent rounded-lg blur-xl"></div>
            <Image
              src="/images/sven-ciupka-8H3cWNtBpdQ-unsplash.jpg"
              alt="Our story"
              width={600}
              height={400}
              className="rounded-lg shadow-lg relative z-10 border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
