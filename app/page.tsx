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

export default function Home() {
  return (
    <div>
      <main>
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
      </main>
      <Footer />
    </div>
  );
}
