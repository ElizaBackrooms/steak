"use client";

import { useMemo, type ComponentType, type ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  type ConnectionProviderProps,
  type WalletProviderProps,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { RPC_URL } from "@/lib/constants";

import "@solana/wallet-adapter-react-ui/styles.css";

const Conn = ConnectionProvider as ComponentType<ConnectionProviderProps>;
const Wallets = WalletProvider as ComponentType<WalletProviderProps>;
const Modal = WalletModalProvider as ComponentType<{ children: ReactNode }>;

export default function SolanaWalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  const endpoint = RPC_URL;
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <Conn endpoint={endpoint}>
      <Wallets wallets={wallets} autoConnect>
        <Modal>{children}</Modal>
      </Wallets>
    </Conn>
  );
}
