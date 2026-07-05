# Staking & fee airdrops

$STEAK is a **pump.fun coin** — lock on Streamflow, register on Google Form, get fee airdrops.

## Player flow

1. **Buy** on pump.fun
2. **Lock** your STEAK on [Streamflow](https://streamflow.finance) for **1 year**
3. **Fill the Google Form** with your wallet address
4. **Receive** trading-fee airdrops (registered lockers on the public pasture leaderboard)

## Founder setup

### Streamflow

1. Create a token lock contract on Streamflow for your STEAK mint
2. Set duration to **12 months**
3. Copy the public lock URL into `NEXT_PUBLIC_STREAMFLOW_STAKE_URL`
4. Sync the public pasture leaderboard: `npm run sync:streamflow` (after `STEAK_MINT` is set)

### Google Form

1. Create a form with a **Wallet address** short-answer field
2. Set `NEXT_PUBLIC_GOOGLE_FORM_URL` to the form view URL

No wallet connect on the site — users type their address in the form manually.

### Fee airdrops

- Collect pump.fun / LP fees on a treasury wallet
- Cross-reference Google Form responses with the Streamflow lock leaderboard (`data/streamflow-locks.json`)
- Airdrop proportionally to registered lockers

## Website sections

| Section | Purpose |
|---------|---------|
| Hero | Groceries photo + CTAs |
| Steak gallery | 20 steak pics |
| Streamflow stake | How to lock 1 year |
| Register | Google form link only |
| Pasture | Public Streamflow lock leaderboard |
