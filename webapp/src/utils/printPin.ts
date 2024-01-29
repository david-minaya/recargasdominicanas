import { IBusiness, ITransaction } from '@recargas-dominicanas/core/types';
import { center, colums, line, newLine, print } from './print';
import { formatCurrency, formatPhone, formatTime } from '@recargas-dominicanas/core/utils';
import { formatDatePart } from './formatDate';

export function printPin(business: IBusiness, transaction: ITransaction) {
  print([
    center(business.name.toLocaleUpperCase()),
    center(formatPhone(business.phone)),
    center(business.address),
    newLine(),
    line(),
    center('PIN'),
    line(),
    newLine(),
    colums('Compañía', transaction.product.name),
    colums('Monto', formatCurrency(transaction.amount)),
    colums('Fecha', formatDatePart(transaction.date)),
    colums('Hora', formatTime(transaction.date)),
    newLine(),
    line(),
    center(`PIN: ${transaction.pin || '************'}`),
    line(),
    newLine(),
    transaction.product.pin?.instructions || '',
    newLine()
  ]);
}
