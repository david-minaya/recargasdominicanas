import { compareDates } from './compareDates';

export function formatDay(_date: string | Date ) {

  const date = new Date(_date);
  const isToday = compareDates(new Date(), date);
  const isYesterday = compareDates(getYesterday(), date);

  if (isToday) {
    return 'Hoy';
  }
  
  if (isYesterday) {
    return 'Ayer';
  }

  const dateFormated = new Intl.DateTimeFormat('es-DO', { 
    day: '2-digit', 
    weekday: 'long', 
    month: 'long' 
  }).format(date);

  return capitalize(dateFormated);
}

function getYesterday() {
  const date = new Date();
  date.setDate(new Date().getDate() -1);
  return date;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
