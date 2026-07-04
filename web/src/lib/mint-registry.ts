import { promises as fs } from "fs";
import path from "path";

import { type MintRecord, type MintRegistry, NFT, getCutForSerial } from "./nft";

const EMPTY: MintRegistry = { mints: [], next_serial: 1 };

function registryPath(): string {
  const base = process.env.DATA_PATH ?? path.join(process.cwd(), "..", "data");
  return path.resolve(base, "mints.json");
}

export async function readMintRegistry(): Promise<MintRegistry> {
  try {
    const raw = await fs.readFile(registryPath(), "utf8");
    const parsed = JSON.parse(raw) as MintRegistry;
    return {
      mints: parsed.mints ?? [],
      next_serial: parsed.next_serial ?? 1,
    };
  } catch {
    return { ...EMPTY };
  }
}

export async function writeMintRegistry(data: MintRegistry): Promise<void> {
  const file = registryPath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export function findMintByWallet(registry: MintRegistry, wallet: string): MintRecord | undefined {
  return registry.mints.find((m) => m.wallet === wallet);
}

export async function registerMint(
  wallet: string,
  steakBalance: number,
  onchain?: { nft_mint: string; tx: string },
): Promise<MintRecord> {
  const registry = await readMintRegistry();

  if (registry.mints.length >= NFT.maxSupply) {
    throw new Error("Sold out");
  }

  if (registry.mints.some((m) => m.wallet === wallet)) {
    throw new Error("Already minted");
  }

  const serial = registry.next_serial;
  const record: MintRecord = {
    wallet,
    serial,
    cut: getCutForSerial(serial),
    steak_balance: steakBalance,
    minted_at: Date.now(),
    nft_mint: onchain?.nft_mint,
    tx: onchain?.tx,
  };

  registry.mints.push(record);
  registry.next_serial += 1;
  await writeMintRegistry(registry);
  return record;
}
