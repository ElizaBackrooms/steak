/**
 * Optional on-chain Wagyu NFT mint via Metaplex.
 * Requires NFT_MINT_AUTHORITY_SECRET (base58) and NFT_METADATA_URI in env.
 */

export async function mintWagyuOnChain(
  recipientWallet: string,
  serial: number,
): Promise<{ nft_mint: string; tx: string }> {
  const secret = process.env.NFT_MINT_AUTHORITY_SECRET;
  const metadataUri = process.env.NFT_METADATA_URI;

  if (!secret || !metadataUri) {
    throw new Error("On-chain NFT mint not configured (set NFT_MINT_AUTHORITY_SECRET and NFT_METADATA_URI)");
  }

  const bs58 = (await import("bs58")).default;
  const { createUmi } = await import("@metaplex-foundation/umi-bundle-defaults");
  const { mplTokenMetadata, createNft } = await import("@metaplex-foundation/mpl-token-metadata");
  const { createSignerFromKeypair, generateSigner, keypairIdentity, percentAmount, publicKey } =
    await import("@metaplex-foundation/umi");
  const { fromWeb3JsKeypair } = await import("@metaplex-foundation/umi-web3js-adapters");
  const { Keypair } = await import("@solana/web3.js");

  const rpc = process.env.SOLANA_RPC_URL ?? process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
  if (!rpc) throw new Error("RPC URL not configured");

  const umi = createUmi(rpc).use(mplTokenMetadata());

  const keypair = Keypair.fromSecretKey(bs58.decode(secret));
  const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(keypair));
  umi.use(keypairIdentity(signer));

  const mint = generateSigner(umi);

  const result = await createNft(umi, {
    mint,
    name: `Wagyu Cut #${serial}`,
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(5),
    tokenOwner: publicKey(recipientWallet),
  }).sendAndConfirm(umi);

  const sig = result.signature;
  const tx = typeof sig === "string" ? sig : bs58.encode(sig);

  return {
    nft_mint: mint.publicKey,
    tx,
  };
}

export function isOnChainMintConfigured(): boolean {
  return Boolean(process.env.NFT_MINT_AUTHORITY_SECRET && process.env.NFT_METADATA_URI);
}
