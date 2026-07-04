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
  title: "$STEAK — Bottle-Fed to Blockchain",
  description:
    "The lore-first meme coin from @lazefrito. Raise your bags on Solana. pump.fun launch tonight.",
  openGraph: {
    title: "$STEAK — Bottle-Fed to Blockchain",
    description: "You bottle-fed her. You raised her. Now raise your bags on-chain.",
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
