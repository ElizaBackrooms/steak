import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Story />
        <Tokenomics />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
