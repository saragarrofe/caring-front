export function addDays(isoDate: string, days: number): Date {
  const d = new Date(isoDate);
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + days);
  return d;
}

export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = Math.floor((a.getTime() - b.getTime()) / msPerDay);
  return diff;
}

export function formatShort(date: Date): string {
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}
