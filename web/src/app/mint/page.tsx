import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import MintClient from "./MintClient";

export const metadata = {
  title: "Mint Steak Cut — $STEAK",
  description: "Hold 100,000 STEAK to mint 1 of 200 Steak Cut NFTs — ribeye, sirloin, brisket, and more.",
};

export default function MintPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen pt-20">
        <MintClient />
      </main>
      <Footer />
    </>
  );
}
