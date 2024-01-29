import { IBusiness, ITransaction } from '@recargas-dominicanas/core/types';
import { center, colums, line, newLine, print } from './print';
import { formatCurrency, formatPhone, formatRef, formatTime } from '@recargas-dominicanas/core/utils';
import { formatDatePart } from './formatDate';

export function printTopup(business: IBusiness, transaction: ITransaction) {
  print([
    center(business.name.toLocaleUpperCase()),
    center(formatPhone(business.phone)),
    center(business.address),
    newLine(),
    line(),
    center('RECARGA'),
    line(),
    newLine(),
    colums('Compañía', transaction.product.name),
    colums('Teléfono', formatPhone(transaction.phone)),
    colums('Monto', formatCurrency(transaction.amount)),
    colums('Fecha', formatDatePart(transaction.date)),
    colums('Hora', formatTime(transaction.date)),
    colums('Referencia', formatRef(transaction.reference!)),
    newLine(),
    line(),
    center(transaction.cancelled ? 'RECARGA CANCELADA' : '¡Gracias por su compra!'),
    newLine()
  ]);
}
