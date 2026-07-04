import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import LorePanels from "@/components/LorePanels";
import WalletStats from "@/components/WalletStats";
import Steakometer from "@/components/Steakometer";
import HerdBoard from "@/components/HerdBoard";
import CutLevelsGallery from "@/components/CutLevelsGallery";
import CutRoomTeaser from "@/components/CutRoomTeaser";
import Tokenomics from "@/components/Tokenomics";
import Quests from "@/components/Quests";
import Receipts from "@/components/Receipts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <LorePanels />
        <WalletStats />
        <Steakometer />
        <CutLevelsGallery />
        <CutRoomTeaser />
        <HerdBoard />
        <Tokenomics />
        <Quests />
        <Receipts />
      </main>
      <Footer />
    </>
  );
}
