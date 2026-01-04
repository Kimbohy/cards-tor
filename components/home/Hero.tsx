import Nav from "../Nav";

const Hero = () => {
  return (
    <section
      id="Hero"
      className="min-h-screen w-screen relative hero text-white flex flex-col justify-center p-4 sm:p-6 md:p-9"
    >
      <div className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl md:mt-16 mt-20 md:flex-1 font-serif text-center px-4">
        <span>Place to find</span>
        <br className="block md:hidden" />
        <span className=" max-sm:text-6xl">your cards</span>
      </div>
      <div className="md:flex justify-center md:justify-end w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 md:mr-10 hidden">
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
