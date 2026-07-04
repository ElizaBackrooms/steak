import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "The Pasture — $STEAK",
  description: "Marination points, grazing tiers, and the herd leaderboard.",
};

export default function DashboardPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen pt-20">
        <DashboardClient />
      </main>
      <Footer />
    </>
  );
}
