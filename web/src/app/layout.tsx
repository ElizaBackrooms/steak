import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import SolanaWalletProvider from "@/components/WalletProvider";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Ranch — $STEAK · Bottle-Fed to Blockchain",
  description:
    "pump.fun meme coin on Solana. Steak pics, Streamflow 1-year stake, register your wallet for fee airdrops.",
  openGraph: {
    title: "The Ranch — $STEAK",
    description: "Lock on Streamflow. Register your wallet. Catch fee airdrops.",
    images: ["/steaks/001.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}
