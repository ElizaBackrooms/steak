import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

import { nextButcherDay } from "./butcher-day";

export interface SteakPost {
  id: string;
  wallet: string;
  imageUrl: string;
  caption: string;
  createdAt: number;
  /** wallets that liked this post */
  likes: string[];
}

export interface SteakOffData {
  /** weekId (Butcher Day ISO date) -> posts submitted that week */
  weeks: Record<string, SteakPost[]>;
}

const EMPTY: SteakOffData = { weeks: {} };

const MAX_CAPTION = 200;
const MAX_POSTS_PER_WEEK = 100;

function dataFilePath(): string {
  const base = process.env.DATA_PATH ?? path.join(process.cwd(), "..", "data");
  return path.resolve(base, "steak-off.json");
}

/** Week bucket = the upcoming Butcher Day (Sunday 00:00 UTC) the entries compete for. */
export function currentWeekId(): string {
  return nextButcherDay().toISOString().slice(0, 10);
}

/** The most recently completed week (previous Butcher Day). */
export function lastWeekId(): string {
  const prev = nextButcherDay();
  prev.setUTCDate(prev.getUTCDate() - 7);
  return prev.toISOString().slice(0, 10);
}

export async function readSteakOff(): Promise<SteakOffData> {
  try {
    const raw = await fs.readFile(dataFilePath(), "utf8");
    const parsed = JSON.parse(raw) as SteakOffData;
    if (parsed && typeof parsed.weeks === "object") return parsed;
    return { ...EMPTY, weeks: {} };
  } catch {
    return { ...EMPTY, weeks: {} };
  }
}

export async function writeSteakOff(data: SteakOffData): Promise<void> {
  const file = dataFilePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export function sortByLikes(posts: SteakPost[]): SteakPost[] {
  return [...posts].sort((a, b) => b.likes.length - a.likes.length || a.createdAt - b.createdAt);
}

export function validateSubmission(input: {
  wallet?: unknown;
  imageUrl?: unknown;
  caption?: unknown;
}): { ok: true; wallet: string; imageUrl: string; caption: string } | { ok: false; error: string } {
  const wallet = typeof input.wallet === "string" ? input.wallet.trim() : "";
  const imageUrl = typeof input.imageUrl === "string" ? input.imageUrl.trim() : "";
  const caption = typeof input.caption === "string" ? input.caption.trim() : "";

  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(wallet)) {
    return { ok: false, error: "Connect a valid Solana wallet first." };
  }
  let url: URL;
  try {
    url = new URL(imageUrl);
  } catch {
    return { ok: false, error: "Image URL is not a valid link." };
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return { ok: false, error: "Image URL must be http(s)." };
  }
  if (caption.length > MAX_CAPTION) {
    return { ok: false, error: `Caption too long (max ${MAX_CAPTION} chars).` };
  }
  return { ok: true, wallet, imageUrl, caption };
}

export async function addPost(input: {
  wallet: string;
  imageUrl: string;
  caption: string;
}): Promise<{ ok: true; post: SteakPost } | { ok: false; error: string }> {
  const data = await readSteakOff();
  const week = currentWeekId();
  const posts = data.weeks[week] ?? [];

  if (posts.some((p) => p.wallet === input.wallet)) {
    return { ok: false, error: "One steak per wallet per week — yours is already on the grill." };
  }
  if (posts.length >= MAX_POSTS_PER_WEEK) {
    return { ok: false, error: "The grill is full this week. Come back after Butcher Day." };
  }

  const post: SteakPost = {
    id: crypto.randomUUID(),
    wallet: input.wallet,
    imageUrl: input.imageUrl,
    caption: input.caption,
    createdAt: Date.now(),
    likes: [],
  };
  data.weeks[week] = [...posts, post];
  await writeSteakOff(data);
  return { ok: true, post };
}

export async function toggleLike(input: {
  wallet: string;
  postId: string;
}): Promise<{ ok: true; likes: number; liked: boolean } | { ok: false; error: string }> {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(input.wallet)) {
    return { ok: false, error: "Connect a valid Solana wallet to like." };
  }
  const data = await readSteakOff();
  const week = currentWeekId();
  const posts = data.weeks[week] ?? [];
  const post = posts.find((p) => p.id === input.postId);
  if (!post) return { ok: false, error: "Post not found in this week's Steak-Off." };

  const idx = post.likes.indexOf(input.wallet);
  const liked = idx === -1;
  if (liked) post.likes.push(input.wallet);
  else post.likes.splice(idx, 1);

  await writeSteakOff(data);
  return { ok: true, likes: post.likes.length, liked };
}
