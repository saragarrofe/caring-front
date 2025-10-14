
// obtener el inicio del dia de una fecha (00:00:00)
export function startOfDate(date: Date): Date {
    const dateCopy = new Date(date);
    dateCopy.setHours(0, 0, 0, 0);
    return dateCopy;
}

// formatear fecha a formato ISO (YYYY-MM-DD)
export function toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// sumar dias a una fecha y devolver en formato ISO (YYYY-MM-DD)
export function addDays(date: Date, days: number): string {
  const base = startOfDate(date);
  base.setDate(base.getDate() + days);
  return base.toISOString().split('T')[0];
}

// calcular los dias que faltan para una fecha dada (YYYY-MM-DD)
export function daysUntil(date: string): number {
    const targetDate = new Date(date);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}