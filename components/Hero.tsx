import Nav from "./hero/Nav";

const Hero = () => {
  return (
    <section
      id="Hero"
      className="min-h-screen w-screen relative -top-9 -left-9 hero text-white flex flex-col items-center p-4 sm:p-6 md:p-9"
    >
      <Nav variant="Landing" />
      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex-1 font-serif text-center px-4">
        Place to find your cards
      </span>
      <div className="flex justify-center md:justify-end w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 md:mr-10">
        <p className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center md:text-end font-serif">
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
