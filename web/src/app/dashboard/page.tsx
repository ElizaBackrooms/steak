import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard — $STEAK",
  description: "Rancher dashboard — balance, tier, and harvest points.",
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
