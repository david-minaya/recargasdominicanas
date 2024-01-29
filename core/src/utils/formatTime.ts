export function formatTime(date: Date | string) {
  return new Intl.DateTimeFormat('es-DO', { 
    // @ts-ignore
    timeStyle: 'short',
  }).format(new Date(date));
}
