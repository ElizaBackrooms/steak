"use client";

import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { NFT, STEAK_CUTS } from "@/lib/nft";

type MintStatus = {
  remaining: number;
  minted: number;
  steak_balance: number;
  eligible: boolean;
  reason: string | null;
  already_minted: { serial: number; nft_mint: string | null } | null;
  on_chain_configured: boolean;
};

export default function MintClient() {
  const { publicKey, connected } = useWallet();
  const [status, setStatus] = useState<MintStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [result, setResult] = useState<{ serial: number; name: string; nft_mint: string | null; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wallet = publicKey?.toBase58();

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = wallet ? `?wallet=${wallet}` : "";
      const res = await fetch(`/api/mint/status${q}`, { cache: "no-store" });
      const data = (await res.json()) as MintStatus & { min_steak: number };
      setStatus({
        remaining: data.remaining,
        minted: data.minted,
        steak_balance: data.steak_balance ?? 0,
        eligible: data.eligible ?? false,
        reason: data.reason,
        already_minted: data.already_minted,
        on_chain_configured: data.on_chain_configured,
      });
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleMint() {
    if (!wallet) return;
    setMinting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });
      const data = (await res.json()) as {
        error?: string;
        serial?: number;
        name?: string;
        nft_mint?: string | null;
        message?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Mint failed");
        return;
      }
      setResult({
        serial: data.serial!,
        name: data.name ?? `Steak Cut #${data.serial}`,
        nft_mint: data.nft_mint ?? null,
        message: data.message ?? "Minted!",
      });
      await refresh();
    } catch {
      setError("Network error — try again");
    } finally {
      setMinting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="text-center">
        <p className="text-6xl" aria-hidden>
          🥩
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-steak-cream">The Cut Room</h1>
        <p className="mt-2 text-steak-cream/60">
          {NFT.minSteakBalance.toLocaleString()} STEAK = 1 Steak Cut NFT · {NFT.maxSupply} total · 1 per wallet
        </p>
        <p className="mt-3 text-xs text-steak-cream/40">
          Cuts: {STEAK_CUTS.join(" · ")}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-steak-800 bg-steak-900/50 p-6">
        <div className="flex justify-between text-sm">
          <span className="text-steak-cream/50">Minted</span>
          <span className="font-semibold text-steak-cream">
            {loading ? "…" : `${status?.minted ?? 0} / ${NFT.maxSupply}`}
          </span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-steak-cream/50">Remaining</span>
          <span className="font-semibold text-steak-amber">{loading ? "…" : (status?.remaining ?? "—")}</span>
        </div>

        <div className="mt-6 flex justify-center">
          <WalletMultiButton className="!bg-steak-red !font-semibold hover:!bg-steak-red/90" />
        </div>

        {connected && wallet && (
          <div className="mt-6 space-y-3 border-t border-steak-800 pt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-steak-cream/50">Your STEAK</span>
              <span className="font-mono text-steak-cream">
                {loading ? "…" : (status?.steak_balance ?? 0).toLocaleString()}
              </span>
            </div>

            {status?.already_minted && (
              <div className="rounded-xl bg-steak-800/50 p-4 text-center">
                <p className="font-semibold text-steak-amber">You already hold a Steak Cut (#{status.already_minted.serial})</p>
                {status.already_minted.nft_mint && (
                  <p className="mt-1 break-all font-mono text-xs text-steak-cream/50">
                    {status.already_minted.nft_mint}
                  </p>
                )}
              </div>
            )}

            {!status?.already_minted && status?.eligible && (
              <button
                type="button"
                onClick={handleMint}
                disabled={minting || (status?.remaining ?? 0) === 0}
                className="w-full rounded-full bg-steak-red py-3 font-semibold text-white transition hover:bg-steak-red/90 disabled:opacity-50"
              >
                {minting ? "Minting…" : "Mint Your Cut"}
              </button>
            )}

            {!status?.already_minted && !status?.eligible && status?.reason && (
              <p className="text-center text-steak-cream/60">{status.reason}</p>
            )}

            {error && <p className="text-center text-red-400">{error}</p>}

            {result && (
              <div className="rounded-xl border border-steak-amber/30 bg-steak-800/30 p-4 text-center">
                <p className="font-display text-xl font-bold text-steak-amber">{result.name}</p>
                <p className="mt-2 text-sm text-steak-cream/70">{result.message}</p>
                {result.nft_mint && (
                  <a
                    href={`https://solscan.io/token/${result.nft_mint}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-steak-amber underline"
                  >
                    View on Solscan
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {!connected && (
          <p className="mt-6 text-center text-sm text-steak-cream/50">
            Connect wallet to check eligibility and mint.
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-steak-cream/40">
        Tradeable on Magic Eden / Tensor. No escrow yet — hold in wallet for future Harvest eligibility.
      </p>
    </div>
  );
}
