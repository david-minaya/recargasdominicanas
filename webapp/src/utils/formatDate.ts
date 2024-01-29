export function formatDatePart(date: string) {
  return new Intl.DateTimeFormat('es-DO', { dateStyle: 'medium' }).format(new Date(date));
}
