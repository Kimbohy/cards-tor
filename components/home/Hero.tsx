import Image from "next/image";

const Hero = () => {
  return (
    <section className="min-h-screen w-full relative hero text-white flex flex-col justify-center p-4 sm:p-6 md:p-9">
      <Image
        src="/images/bg-hero.jpg"
        alt="Hero background"
        fill
        priority
        quality={100}
        className="object-cover object-top-left dark:hidden"
      />
      <Image
        src="/images/bg-hero-dark.jpg"
        alt="Hero background dark mode"
        fill
        priority
        quality={100}
        className="object-cover object-top-left hidden dark:block"
      />
      <div className="text-5xl sm:text-5xl md:text-6xl text-secondary-foreground lg:text-7xl xl:text-8xl md:mt-24 mt-20 md:flex-1 font-serif text-center px-4 relative z-10">
        <span>Place to find</span>
        <br className="block md:hidden" />
        <span className=" max-dm:text-6xl">your cards</span>
      </div>
      <div className="md:flex justify-center md:justify-end w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 md:mr-10 hidden relative z-10">
        <p className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-secondary-foreground sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center md:text-end font-serif">
          The ultimate platform to buy your new deck.
          <br />
          Explore premium playing card productions designed for cardistry,
          magic, and card games. Find the perfect deck for your practice.
        </p>
      </div>
    </section>
  );
};

export default Hero;
