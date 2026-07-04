import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

import { RPC_URL, TOKEN } from "./constants";

export async function getSteakBalance(
  walletAddress: string,
  connection = new Connection(RPC_URL, "confirmed"),
): Promise<number> {
  const mint = process.env.STEAK_MINT ?? process.env.NEXT_PUBLIC_TOKEN_MINT;
  if (!mint) return 0;

  try {
    const owner = new PublicKey(walletAddress);
    const mintKey = new PublicKey(mint);
    const ata = await getAssociatedTokenAddress(mintKey, owner);
    const account = await getAccount(connection, ata);
    return Number(account.amount) / 10 ** TOKEN.decimals;
  } catch {
    return 0;
  }
}
