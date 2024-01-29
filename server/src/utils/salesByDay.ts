import { SalesByDay } from '../interfaces/salesByDay';

export function salesByDay(startDate: Date, endDate: Date, sales: SalesByDay[]) {

  let date = startDate;
  const salesByDay = [];

  while (date.getTime() < endDate.getTime()) {

    const sale = sales.find(sale => sale.date.toLocaleDateString() === date.toLocaleDateString());

    salesByDay.push({ 
      date: date,
      sales: sale?.sales || 0,
      profit: sale?.profit || 0,
    });

    date = nextDay(date);
  }
  
  return salesByDay;
}

function nextDay(date: Date) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 1)
  return newDate;
}
