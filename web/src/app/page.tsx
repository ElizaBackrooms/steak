import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import SectionBackdrop from "@/components/SectionBackdrop";
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
      <main>
        <Hero />
        <SectionBackdrop image="/backgrounds/bg-barn.jpg" overlay="warm" id="story">
          <LorePanels />
        </SectionBackdrop>
        <SectionBackdrop image="/backgrounds/bg-bonfire.jpg" overlay="ember" id="stake-wrap">
          <StreamflowStake />
        </SectionBackdrop>
        <SectionBackdrop image="/backgrounds/bg-pasture.jpg" overlay="dark" id="register-wrap">
          <StakeForm />
        </SectionBackdrop>
        <SteakGallery />
        <SectionBackdrop image="/backgrounds/bg-pasture.jpg" overlay="darker">
          <WalletStats />
          <HerdBoard />
        </SectionBackdrop>
        <SectionBackdrop image="/backgrounds/bg-barn.jpg" overlay="dark" id="tokenomics-wrap">
          <Tokenomics />
          <Receipts />
        </SectionBackdrop>
      </main>
      <Footer />
    </>
  );
}
