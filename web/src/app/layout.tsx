import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
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
    "In memory of Groceries. pump.fun on Solana — lock on Streamflow, register via Google form, fee airdrops.",
  openGraph: {
    title: "Groceries Ranch — $STEAK",
    description: "Her name was Groceries. Lock on Streamflow. Fill the form. Catch fee airdrops.",
    images: ["/groceries-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
