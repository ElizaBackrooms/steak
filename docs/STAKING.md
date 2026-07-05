# Staking & fee airdrops

$STEAK is a **pump.fun coin only** — no NFTs.

## Player flow

1. **Buy** on pump.fun
2. **Lock** your STEAK on [Streamflow](https://streamflow.finance) for **1 year**
3. **Register** your wallet on the Google Form (linked on the site)
4. **Receive** trading-fee airdrops proportional to your registered lock

## Founder setup

### Streamflow

1. Create a token lock contract on Streamflow for your STEAK mint
2. Set duration to **12 months**
3. Copy the public lock URL into `NEXT_PUBLIC_STREAMFLOW_STAKE_URL`

### Google Form

1. Create a form with fields: **Wallet address** (short answer), optional **TX / lock proof**
2. Get prefill link → extract `entry.XXXXXXXX` for the wallet field
3. Set env:
   - `NEXT_PUBLIC_GOOGLE_FORM_URL` — full form view URL
   - `NEXT_PUBLIC_GOOGLE_FORM_WALLET_ENTRY` — e.g. `entry.1234567890`

The site pre-fills the wallet when users connect Phantom/Solflare.

### Fee airdrops

- Collect pump.fun / LP fees on a treasury wallet
- Export Google Form responses + verify Streamflow locks on-chain
- Airdrop SOL or STEAK to registered wallets (manual or scripted — add script later)

## Website sections

| Section | Purpose |
|---------|---------|
| Steak gallery | Visual — pictures of steaks |
| Streamflow stake | How to lock 1 year |
| Register | Google form + wallet connect |
| Pasture / Herd | Leaderboard + marination points |
