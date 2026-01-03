import Nav from "./hero/Nav";

const Hero = () => {
  return (
    <section
      id="Hero"
      className="h-screen w-screen relative -top-9 -left-9 hero text-white flex flex-col items-center p-9"
    >
      <Nav variant="Landing" />
      <span className="text-8xl md:mt-20 flex-1 font-serif">
        Place to find your cards
      </span>
      <div className=" flex justify-end w-full mb-20 mr-10">
        <p className="w-2xl text-3xl text-end font-serif">
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
