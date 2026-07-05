/** Steak photo gallery — visual site art, not NFTs */

export const STEAK_GALLERY_COUNT = 20;

export function steakImagePath(index: number): string {
  const n = Math.max(1, Math.min(STEAK_GALLERY_COUNT, Math.floor(index)));
  return `/steaks/${String(n).padStart(3, "0")}.jpg`;
}

/** Featured picks in the gallery grid */
export const FEATURED_STEAKS = [1, 5, 10, 15, 20, 3, 8, 12] as const;
