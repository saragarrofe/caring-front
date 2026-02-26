
export function startOfDate(date: Date): Date {
    const dateCopy = new Date(date);
    dateCopy.setHours(0, 0, 0, 0);
    return dateCopy;
}

export function toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): string {
  const base = startOfDate(date);
  base.setDate(base.getDate() + days);
  return base.toISOString().split('T')[0];
}

export function daysUntil(dateISO: string): number {
  const target = new Date(dateISO + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}
