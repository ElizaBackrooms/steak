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
  title: "Groceries Ranch — $STEAK · Bottle-Fed to Blockchain",
  description:
    "In memory of Groceries. pump.fun on Solana — steak pics, Streamflow 1-year stake, wallet registration, fee airdrops.",
  openGraph: {
    title: "Groceries Ranch — $STEAK",
    description: "Her name was Groceries. Lock on Streamflow. Register your wallet. Catch fee airdrops.",
    images: ["/backgrounds/bg-hero-ranch.jpg"],
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
