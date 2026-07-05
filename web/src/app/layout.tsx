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
    "Proof of Steak on Solana. Hold STEAK, mint a Steak Cut NFT, climb the Herd. pump.fun launch tonight.",
  openGraph: {
    title: "The Ranch — $STEAK",
    description: "You raised it. Now raise your bags. 100k STEAK = 1 Steak Cut NFT.",
    images: ["/cuts/serial/001.jpg"],
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
