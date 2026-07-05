import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import LorePanels from "@/components/LorePanels";
import SteakGallery from "@/components/SteakGallery";
import StreamflowStake from "@/components/StreamflowStake";
import StakeForm from "@/components/StakeForm";
import WalletStats from "@/components/WalletStats";
import HerdBoard from "@/components/HerdBoard";
import Tokenomics from "@/components/Tokenomics";
import Receipts from "@/components/Receipts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <main className="bg-white text-steak-950">
        <LorePanels />
        <StreamflowStake />
        <StakeForm />
        <SteakGallery />
        <WalletStats />
        <HerdBoard />
        <Tokenomics />
        <Receipts />
      </main>
      <Footer />
    </>
  );
}
