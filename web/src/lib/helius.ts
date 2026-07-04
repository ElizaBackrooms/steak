const DEFAULT_DECIMALS = 6;

interface TokenAccount {
  owner?: string;
  amount?: number;
}

interface HeliusTokenAccountsResult {
  token_accounts?: TokenAccount[];
  total?: number;
}

export async function fetchTokenHolders(
  mint: string,
  apiKey: string,
  decimals = Number(process.env.STEAK_DECIMALS ?? DEFAULT_DECIMALS),
): Promise<Map<string, number>> {
  const holders = new Map<string, number>();
  const pageSize = 1000;
  let page = 1;

  while (true) {
    const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: `steak-snapshot-${page}`,
        method: "getTokenAccounts",
        params: {
          mint,
          limit: pageSize,
          page,
          displayOptions: {},
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Helius request failed: ${res.status}`);
    }

    const payload = (await res.json()) as {
      error?: { message?: string };
      result?: HeliusTokenAccountsResult;
    };

    if (payload.error) {
      throw new Error(payload.error.message ?? "Helius RPC error");
    }

    const accounts = payload.result?.token_accounts ?? [];
    if (accounts.length === 0) {
      break;
    }

    for (const account of accounts) {
      if (!account.owner || account.amount == null) continue;
      const balance = account.amount / 10 ** decimals;
      if (balance <= 0) continue;
      holders.set(account.owner, (holders.get(account.owner) ?? 0) + balance);
    }

    const total = payload.result?.total ?? accounts.length;
    if (page * pageSize >= total) {
      break;
    }
    page += 1;
  }

  return holders;
}
