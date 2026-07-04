/** Next Butcher Day = Sunday 00:00 UTC */

export function nextButcherDay(): Date {
  const next = new Date();
  const day = next.getUTCDay();
  const daysUntil = day === 0 ? 7 : 7 - day;
  next.setUTCDate(next.getUTCDate() + daysUntil);
  next.setUTCHours(0, 0, 0, 0);
  return next;
}

export function butcherDayCountdown(now = Date.now()): {
  label: string;
  days: number;
  hours: number;
  iso: string;
} {
  const target = nextButcherDay().getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  return {
    label: days > 0 ? `${days}d ${hours}h` : `${hours}h`,
    days,
    hours,
    iso: new Date(target).toISOString().slice(0, 10),
  };
}
