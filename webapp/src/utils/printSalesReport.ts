import { IBusiness, ISalesReport } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatDate, formatPhone } from '@recargas-dominicanas/core/utils';
import { center, colums, line, newLine, print } from './print';

export function printSalesReport(business: IBusiness, salesReport: ISalesReport) {
  print([
    center(business.name.toLocaleUpperCase()),
    center(formatPhone(business.phone)),
    center(business.address),
    newLine(),
    line(),
    center('Cierre de ventas'),
    line(),
    newLine(),
    colums('Balance', formatCurrency(salesReport.balance)),
    colums('Ventas', formatCurrency(salesReport.sales)),
    colums('Bal. consumido', formatCurrency(salesReport.sales - salesReport.profit)),
    colums('Beneficio', formatCurrency(salesReport.profit)),
    newLine(),
    line(),
    center(formatDate(salesReport.date)),
    newLine()
  ]);
}
