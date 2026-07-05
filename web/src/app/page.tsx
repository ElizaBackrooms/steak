import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import LorePanels from "@/components/LorePanels";
import SteakGallery from "@/components/SteakGallery";
import StreamflowStake from "@/components/StreamflowStake";
import StakeForm from "@/components/StakeForm";
import PastureBoard from "@/components/PastureBoard";
import Tokenomics from "@/components/Tokenomics";
import Receipts from "@/components/Receipts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <main className="text-steak-cream">
        <LorePanels />
        <StreamflowStake />
        <StakeForm />
        <SteakGallery />
        <PastureBoard />
        <Tokenomics />
        <Receipts />
      </main>
      <Footer />
    </>
  );
}
