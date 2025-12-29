import Nav from "./hero/Nav";

const Hero = () => {
  return (
    <div className="h-screen w-screen hero p-7 text-white flex flex-col items-center">
      <Nav />
      <span className="text-8xl md:mt-20 flex-1">Place to find your cards</span>
      <div className=" flex justify-end w-full mb-20 mr-10">
        <p className="w-2xl text-3xl text-end">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
          inventore quam ea dolores, consectetur cum fugit illum vel nihil
          molestiae aliquid et eveniet commodi impedit at fuga eligendi omnis
          distinctio!
        </p>
      </div>
    </div>
  );
};

export default Hero;
