"use client";

import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { LINKS } from "@/lib/constants";

export default function StakeForm() {
  const { publicKey, connected } = useWallet();
  const wallet = publicKey?.toBase58();

  const formUrl = useMemo(() => {
    if (!LINKS.googleForm) return null;
    if (!wallet || !LINKS.googleFormWalletEntry) return LINKS.googleForm;
    const url = new URL(LINKS.googleForm);
    url.searchParams.set(LINKS.googleFormWalletEntry, wallet);
    return url.toString();
  }, [wallet]);

  return (
    <section id="register" className="border-t border-steak-800/60 bg-steak-900/20 px-4 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-steak-amber">Register</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-steak-cream">Wallet + Google form</h2>
        <p className="mt-3 text-sm text-steak-cream/60">
          After you lock on Streamflow, connect your wallet and open the form. Your address pre-fills when configured.
        </p>

        <div className="mt-8 flex justify-center">
          <WalletMultiButton className="!bg-steak-red !font-semibold hover:!bg-steak-red/90" />
        </div>

        {connected && wallet && (
          <div className="mt-6 rounded-xl border border-steak-800 bg-steak-950/60 p-4">
            <p className="text-xs uppercase tracking-wider text-steak-cream/40">Connected wallet</p>
            <p className="mt-1 break-all font-mono text-sm text-steak-cream">{wallet}</p>
          </div>
        )}

        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block w-full rounded-full bg-steak-red px-8 py-4 font-bold text-white transition hover:bg-steak-red/90 sm:w-auto"
          >
            Open registration form
          </a>
        ) : (
          <p className="mt-8 rounded-xl border border-dashed border-steak-800 px-4 py-6 text-sm text-steak-cream/50">
            Set <code className="text-steak-amber">NEXT_PUBLIC_GOOGLE_FORM_URL</code> in env after you create the form.
          </p>
        )}

        {!connected && (
          <p className="mt-6 text-xs text-steak-cream/40">Connect wallet first so we can pre-fill your address.</p>
        )}
      </div>
    </section>
  );
}
