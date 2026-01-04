import Image from "next/image";

export default function Storytelling() {
  return (
    <section
      id="Storytelling"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background text-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/icon/images/pattern.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 sm:mb-6 text-primary">
                Our Story of Excellence
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-primary mb-6 sm:mb-8"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              Cards-Tor was born from a passion for premium playing cards. We
              curate the finest decks from top manufacturers worldwide, bringing
              you exceptional quality for every use.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              Our vision: to offer premium decks from renowned productions,
              perfectly suited for cardistry, magic performances, and card
              games. Quality that meets the demands of professionals and
              enthusiasts.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              With careful selection, we bring you cards that elevate your
              practice and performance.
            </p>
            <div className="pt-2 sm:pt-4">
              <div className="inline-block border border-border px-4 sm:px-6 py-2 sm:py-3">
                <p className="text-primary font-serif italic text-sm sm:text-base md:text-lg">
                  "Premium playing cards for cardistry, magic, and gaming"
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-transparent rounded-lg blur-xl"></div>
            <Image
              src="/images/sven-ciupka-8H3cWNtBpdQ-unsplash.jpg"
              alt="Our story"
              width={600}
              height={400}
              className="rounded-lg shadow-lg relative z-10 border border-border w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
