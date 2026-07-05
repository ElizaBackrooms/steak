# LAUNCH TONIGHT — pump.fun Playbook for $STEAK

**Founder:** @lazefrito
**Origin post:** the bottle-fed cow story (~1M views)
**Target launch venue:** pump.fun (Solana)
**Ticker:** $STEAK
**Not legal, tax, or financial advice. Consult counsel before you post the CA.**

---

## 0. Two-hour pre-flight (T-2h → T-0)

Do these in order. Do not skip.

### Wallet + funding

- [ ] Create a fresh **Solana wallet** dedicated to the launch (Phantom or Solflare). Never use a wallet that has ever touched a shady contract.
- [ ] Write the seed phrase on paper. Two copies. Store separately. Do not screenshot. Do not paste it into anything.
- [ ] Fund the launch wallet with **at least 2 SOL**:
  - ~0.02 SOL — pump.fun token creation fee
  - ~0.5–1.5 SOL — founder's own initial buy (see §3)
  - ~0.1 SOL — buffer for transactions, LP move, priority fees
  - Extra as dry powder for defensive buys in the first minutes
- [ ] Create a **second wallet** for team ops (posting, moderation). Do not fund this with more than 0.1 SOL. Never give it token authority.
- [ ] Verify network: mainnet-beta. Not devnet.

### Assets ready to paste

- [ ] Token name: **STEAK**
- [ ] Ticker: **STEAK**
- [ ] Image: 1:1, transparent or solid background, ≤ 1 MB. Use the cooked ribeye hero from BRAND_STRATEGY.md.
- [ ] One-line description: `Bottle-fed to blockchain. You raise it, you eat it. $STEAK`
- [ ] Website: leave blank at launch OR use a single static landing page you already control. Do not launch a half-done site.
- [ ] X handle: @lazefrito (personal). Do NOT create a separate `@steaktoken_official` account tonight — copycats will impersonate it. Use founder identity as the trust anchor.
- [ ] Telegram: create a **read-only announcements channel** now. Open the group chat only after CA is posted (see hour 24 in §5).

### Content ready to post

- [ ] **Cooking-steak video (30–60s)**: founder in kitchen or on grill, cooking a ribeye. At the end, flip phone or hold up a card showing the CA. Film this dry (no CA overlay) BEFORE launch, then add CA text overlay after mint. Keep it vertical.
- [ ] Backup: a still photo of a steak on a plate with the CA written in Sharpie on a napkin next to it. Ugly, unmistakable, unfakeable.
- [ ] Founding thread drafted (see COMMS_PLAYBOOK.md → "Launch thread").
- [ ] Pinned tweet drafted (see COMMS_PLAYBOOK.md → "Pinned").
- [ ] 3 meme templates saved to phone camera roll (calf → steak, staking dashboard = "I raised it", Slaughter Tax cope).

### Ops checks

- [ ] Phantom on phone AND browser extension both logged into launch wallet.
- [ ] X app logged in on 2 devices in case one gets rate-limited.
- [ ] Screen recorder ready to capture the mint tx and LP lock tx for public receipts.
- [ ] Two trusted friends on standby to reply/quote-retweet in the first 5 minutes so the thread doesn't die in cold-start.

---

## 1. Wallet setup — the exact steps

1. Install Phantom (phantom.app). Verify the domain. Do not install from a Google ad.
2. Create new wallet → **Solana**. Backup phrase on paper. Confirm phrase.
3. Fund from an exchange withdrawal (Coinbase, Kraken, Binance). Do a **0.01 SOL test send first**. Confirm it arrives. Then send the rest.
4. In Phantom → Settings → Security & Privacy → turn on **Transaction Simulation** and **Blocked Token List**.
5. Bookmark the real pump.fun URL: `https://pump.fun` (verify letters — no "pumpfun.io" or unicode lookalikes).

---

## 2. Create the token on pump.fun

Executed by founder wallet only.

1. Go to `https://pump.fun` → **Start a new coin**.
2. Fill fields:
   - Name: `STEAK`
   - Ticker: `STEAK`
   - Description: paste the one-liner above.
   - Image: upload the ribeye hero.
   - Twitter: `https://x.com/lazefrito`
   - Telegram: link to the announcements channel (not the group chat).
   - Website: leave empty or link static page.
3. Optional dev buy: **buy 0.5–1.0 SOL of your own token in the same transaction**. This front-loads the bonding curve slightly and puts founder skin in the game visibly. Do NOT buy more than ~2% of supply as founder — snipers will screenshot the top-holder list within 60 seconds and dump you as a scam.
4. Sign. Confirm. **Copy the CA (contract address) the second it appears.** Verify it matches what pump.fun shows in the URL.
5. Screenshot the token page immediately (CA + top-holders panel showing your buy). This is your proof-of-launch artifact.

**Do NOT post the CA yet.** You have a T-0 broadcast window (§4).

---

## 3. Initial buy strategy

Goal: legitimate founder position, not a rug signature.

- **Founder buy at creation:** 0.5–1.0 SOL (in the create tx if pump.fun supports it — it does).
- **Second buy at T+30s:** another 0.25–0.5 SOL from the same wallet to signal continued conviction and push the curve past the sniper bot threshold.
- **Do not** split into 10 wallets and self-buy. Chain analysts and rug detectors will call it out within an hour and it will end the launch.
- **Do not** buy > 2% of total supply as founder. Public top-holder pages will torch you.
- Note the SOL price in USD at buy time — you'll need this for the tokenomics transparency post.

---

## 4. LP lock (pump.fun specifics)

pump.fun handles LP for you: it uses a bonding curve until the token reaches ~$69K market cap, then automatically migrates LP to Raydium and **burns the LP tokens**. That is the "lock." You do not manually lock.

What you do:

- [ ] Publicly state, before launch: "LP auto-migrates to Raydium and burns at graduation. I hold zero LP tokens. Ever."
- [ ] The moment the token graduates to Raydium, screenshot the Raydium pool page and the burn transaction on Solscan. Post both in the launch thread with the caption: "LP burned. Receipts: [link]. There is no rug switch."
- [ ] If graduation does not happen tonight, that's fine — state clearly that LP is held on the bonding curve until graduation and no one (including founder) can pull it. Link pump.fun's mechanics page as proof.

**Never claim "LP locked" without a link a stranger can verify in one click.**

---

## 5. Broadcast — CA posted on X + cooking video

**T-0 exactly:**

1. Post the pinned tweet (see COMMS_PLAYBOOK.md). This is CA + cooking-steak video + one line of copy. Nothing else.
2. Reply to the pinned tweet with the launch thread (5–8 posts, see COMMS_PLAYBOOK.md). Include:
   - CA (again, in the first reply)
   - Solscan link
   - pump.fun link
   - Tokenomics summary + link to TOKENOMICS.md
   - Roadmap in one screenshot
   - Airdrop rules link
   - "Not financial advice" line
3. Quote-retweet the original bottle-fed viral post with: "Same rules, on-chain now. CA in pinned."
4. DM the CA + pinned link to the 5–10 crypto meme accounts prepped in advance. Ask for a quote, not a paid promo.
5. Post the same content on Farcaster and TikTok (the cooking video is native TikTok content — put CA in the caption and pinned comment, not on-screen for the first 3 seconds so it doesn't get flagged).

**What NOT to broadcast tonight:**

- No Discord invite yet (spammers will pile in before mods are ready).
- No Telegram group chat link — announcement channel only.
- No promise of a specific price, market cap, or exchange listing.
- No screenshots of your P&L.

---

## 6. First 72 hours — hour-by-hour playbook

All times are relative to T-0 (moment CA is public).

### Hour 0 → Hour 1: The Ignition
- Reply to every quote-tweet in the first hour. Even the negative ones — with jokes, not defense.
- Every 10 minutes, post a **status card**: current holders count, current MC, "we're still cooking." Screenshot from pump.fun.
- **Do not** buy your own token again during this window. Watchers will notice and label it wash trading.
- Two friends should quote-retweet the pinned within the first 5 minutes.

### Hour 1 → Hour 6: Meme Engine On
- Post **one meme every 20–30 minutes**. Rotate templates.
- Reply-guy on any tweet mentioning steak, ranching, or the original viral post with the CA and a one-line joke.
- Any account with > 10k followers who quotes or engages: reply with a personal thank you. That reply gets seen by all their followers.
- **First FUD wave will hit around hour 2.** Standard playbook: transparency link, one-line joke, move on. See COMMS_PLAYBOOK.md → "FUD replies."

### Hour 6 → Hour 12: First Holders Onboarding
- Post the **Grazing Seasons explainer** (a 4-slide image or thread). This is the moment you educate: staking = commitment, not APY farming.
- Open the Telegram group chat. Pin: (1) CA, (2) tokenomics link, (3) "no admins will DM you first."
- Assign 2 mods. Ban policy: any DM'd contract address, any "send SOL to double it," any impersonator = permaban + screenshot + expose.
- Post the **top 10 holders** screenshot with commentary: "Founding Ranchers. This is the herd."

### Hour 12 → Hour 24: Sustained Presence
- Founder does NOT sleep in this window without a designated shift partner replying.
- Post at least once every hour. Even a photo of a coffee cup with "still ranching" beats silence.
- **Hour 18:** post the tokenomics deep-dive thread linking TOKENOMICS.md. This is your "we are not vaporware" moment.
- **Hour 20:** announce Genesis Harvest signup mechanic (see AIRDROP_RULES.md → Genesis).

### Hour 24 → Hour 36: The Story Spaces
- Host X Spaces at **hour 30** (chosen for US evening / EU night overlap). Title: "I raised her. I ate her. Now I'm doing it again."
- Tell the full bottle-fed cow story on the record. Cry if you have to. Do not sell. Do not shill price.
- Announce Season 1 staking emissions rate at the end of the Spaces (see TOKENOMICS.md).
- Post a clipped 60-second highlight of the Spaces to X within 30 min of ending.

### Hour 36 → Hour 48: Community Lock-In
- Release the **Genesis NFT mint** (free, gas only). See TOKENOMICS.md and AIRDROP_RULES.md.
- Post the mint countdown every 3 hours: "X hours left to be a Founding Rancher."
- First Harvest snapshot logic is now armed for hour 72.

### Hour 48 → Hour 60: Media Push
- Reach out to 5 crypto podcasts / newsletter writers with a one-paragraph pitch. Do not pay. If they don't bite, move on.
- Founder does one 15-min video interview if invited by an established creator. Not before hour 48 — build the story first.
- Coordinate 1 more meme wave from the community. Announce a meme contest with 100k STEAK prize from the Barn treasury.

### Hour 60 → Hour 72: Countdown to Harvest
- Every hour, post the countdown to the Genesis Harvest snapshot.
- At **T+72h exactly**, take on-chain snapshot of all eligible wallets (see AIRDROP_RULES.md).
- Broadcast the snapshot block number and Solscan link publicly the second it happens. No editing after.

### Hour 72: First Butcher Day
- Execute the Genesis Harvest airdrop on-chain, live on Spaces.
- Record it. Post the tx hash immediately.
- Pinned tweet updates to: "First Butcher Day complete. Next Harvest: Sunday. Grazing continues."

---

## 7. Kill-switches (things that end the launch instantly)

Do any of these and it's over. Instruct every team member.

- Do not sell any founder tokens in the first 30 days. If you must, announce 72h in advance with amounts.
- Do not create a second wallet holding > 1% of supply. Wallet clustering tools will find it.
- Do not delete any tweet, even a typo. Correct in a reply. Deletion = "cover up."
- Do not use the word "guaranteed," "risk-free," "will 100x," or "when Binance."
- Do not touch a customer's private key, ever. Even to "help."
- Do not lie about anything on-chain. Everything on-chain is receipts.

---

## 8. Emergency contacts / actions

- **Wallet compromised:** move remaining SOL to cold wallet immediately. Announce within 10 minutes. Do not attempt to hide it.
- **Impersonator account gets traction:** report on X, then post founder's face on a paper with today's date and the CA. No one can fake that fast.
- **Rug accusation goes viral:** post the LP burn tx, the top-holder list, and a live video of the founder in the same call. Do not argue in text.

---

*This is a launch operations checklist. Not legal, tax, or financial advice. You are responsible for compliance in your jurisdiction. Consult a lawyer before publishing a token, especially if you are US-based.*
