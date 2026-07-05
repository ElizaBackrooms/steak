/** Steak photo gallery — visual site art, not NFTs */

export const STEAK_GALLERY_COUNT = 200;

export function steakImagePath(index: number): string {
  const n = Math.max(1, Math.min(STEAK_GALLERY_COUNT, Math.floor(index)));
  return `/steaks/${String(n).padStart(3, "0")}.jpg`;
}

/** Featured picks for hero-adjacent rows */
export const FEATURED_STEAKS = [1, 17, 42, 88, 133, 200, 55, 12, 99, 144, 3, 76] as const;
