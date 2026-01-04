import Image from "next/image";
import Hero from "@/components/home/Hero";
import WhySpecial from "@/components/home/WhySpecial";
import FeaturedDecks from "@/components/home/FeaturedDecks";
import Collections from "@/components/home/Collections";
import Storytelling from "@/components/home/Storytelling";
import SocialProof from "@/components/home/SocialProof";
import Advantages from "@/components/home/Advantages";
import FAQ from "@/components/home/FAQ";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <WhySpecial />
      <FeaturedDecks />
      <Collections />
      <Storytelling />
      <SocialProof />
      <Advantages />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
}
