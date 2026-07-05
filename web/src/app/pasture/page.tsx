import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import PastureClient from "./PastureClient";

export const metadata = {
  title: "The Pasture — $STEAK Streamflow locks",
  description: "Public leaderboard of STEAK locked on Streamflow.",
};

export default function PasturePage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen pt-20">
        <PastureClient />
      </main>
      <Footer />
    </>
  );
}
