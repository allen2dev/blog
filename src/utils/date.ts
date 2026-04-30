/** Format ISO-like date string as「YYYY年M月D日」only (no weekday/time). */
export function formatPostDate(iso: string): string {
  const t = Date.parse(iso)
  if (!Number.isFinite(t)) return iso
  const d = new Date(t)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}
