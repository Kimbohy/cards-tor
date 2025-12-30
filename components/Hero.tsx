import Nav from "./hero/Nav";

const Hero = () => {
  return (
    <div className="h-screen w-screen hero p-7 text-white flex flex-col items-center">
      <Nav />
      <span className="text-8xl md:mt-20 flex-1">Place to find your cards</span>
      <div className=" flex justify-end w-full mb-20 mr-10">
        <p className="w-2xl text-3xl text-end">
          The ultimate platform to buy your new deck.
          <br />
          Explore a wide variety of card decks and find the perfect one for you
          if you are a collector or a player, for poker or magic the gathering.
        </p>
      </div>
    </div>
  );
};

export default Hero;
