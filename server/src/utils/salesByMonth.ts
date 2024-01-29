import { SalesByDay } from '../interfaces/salesByDay';

export function salesByMonth(startDate: Date, endDate: Date, sales: SalesByDay[]) {

  let date = startDate;
  const salesByMonth = [];

  while (date.getTime() < endDate.getTime()) {

    const sale = sales.find(sale => sale.date.toLocaleDateString() === date.toLocaleDateString());
    const name = new Intl.DateTimeFormat('es', { month: 'short' }).format(date);
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    salesByMonth.push({ 
      date: date,
      name: capitalized,
      sales: sale?.sales || 0,
      profit: sale?.profit || 0,
    });

    date = nextMonth(date);
  }
  
  return salesByMonth;
}

function nextMonth(date: Date) {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + 1)
  return newDate;
}
