export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('es-DO', { 
    // @ts-ignore
    dateStyle: 'medium', 
    timeStyle: 'short',
  }).format(new Date(date));
}
