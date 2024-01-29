import { IBusiness, IDataPlan, ITransaction } from '@recargas-dominicanas/core/types';
import { center, colums, line, newLine, print } from './print';
import { formatCurrency, formatPhone, formatTime } from '@recargas-dominicanas/core/utils';
import { formatDatePart } from './formatDate';

export function printDataPlan(business: IBusiness, transaction: ITransaction, dataPlan?: IDataPlan) {
  print([
    center(business.name.toLocaleUpperCase()),
    center(formatPhone(business.phone)),
    center(business.address),
    newLine(),
    line(),
    center('PAQUETICO'),
    line(),
    newLine(),
    colums('Compañía', transaction.product.name),
    colums('Telefono', formatPhone(transaction.phone)),
    dataPlan ? colums('Plan de datos', dataPlan.name) : '',
    colums('Precio', formatCurrency(transaction.amount)),
    colums('Fecha', formatDatePart(transaction.date)),
    colums('Hora', formatTime(transaction.date)),
    newLine(),
    line(),
    center('¡Gracias por su compra!'),
    newLine()
  ]);
}
