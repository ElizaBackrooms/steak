export const LORE = {
  calfName: "Groceries",
  viralViews: "~1M views",
  founderHandle: "@lazefrito",
} as const;

export const TOKEN = {
  ticker: "STEAK",
  supply: 1_000_000_000,
  decimals: 6,
  tagline: "Groceries · Bottle-Fed to Blockchain",
  founder: "@lazefrito",
  community: "Ranchers",
} as const;

export const LINKS = {
  pump: process.env.NEXT_PUBLIC_PUMP_URL ?? "https://pump.fun",
  x: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/lazefrito",
  mint: process.env.NEXT_PUBLIC_TOKEN_MINT ?? "",
  streamflow:
    process.env.NEXT_PUBLIC_STREAMFLOW_STAKE_URL ??
    "https://app.streamflow.finance/contract/solana/mainnet/lock",
  googleForm: process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ?? "",
} as const;

export const RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ??
  process.env.SOLANA_RPC_URL ??
  "https://api.mainnet-beta.solana.com";
