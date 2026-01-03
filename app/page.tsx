import Image from "next/image";
import Hero from "../components/Hero";
import WhySpecial from "../components/sections/WhySpecial";
import FeaturedDecks from "../components/sections/FeaturedDecks";
import Collections from "../components/sections/Collections";
import Storytelling from "../components/sections/Storytelling";
import Quality from "../components/sections/Quality";
import SocialProof from "../components/sections/SocialProof";
import Advantages from "../components/sections/Advantages";
import FAQ from "../components/sections/FAQ";
import Newsletter from "../components/sections/Newsletter";
import Footer from "../components/sections/Footer";
import ThemTrigger from "@/components/Them-trigger";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <WhySpecial />
      <FeaturedDecks />
      <Collections />
      <Storytelling />
      <Quality />
      <SocialProof />
      <Advantages />
      <FAQ />
      <Newsletter />
      <Footer />
      <ThemTrigger variant="Landing" />
    </div>
  );
}
