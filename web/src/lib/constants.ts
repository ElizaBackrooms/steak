export const TOKEN = {
  ticker: "STEAK",
  supply: 1_000_000_000,
  decimals: 6,
  tagline: "Bottle-Fed to Blockchain",
  founder: "@lazefrito",
  community: "Ranchers",
} as const;

export const LINKS = {
  pump: process.env.NEXT_PUBLIC_PUMP_URL ?? "https://pump.fun",
  x: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/lazefrito",
  mint: process.env.NEXT_PUBLIC_TOKEN_MINT ?? "",
} as const;

export const RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ??
  process.env.SOLANA_RPC_URL ??
  "https://api.mainnet-beta.solana.com";
