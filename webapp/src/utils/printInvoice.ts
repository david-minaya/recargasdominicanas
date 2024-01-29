import { IBusiness, ITransaction } from '@recargas-dominicanas/core/types';
import { center, colums, line, newLine, print } from './print';
import { formatCurrency, formatPhone, formatRef, formatTime } from '@recargas-dominicanas/core/utils';
import { formatDatePart } from './formatDate';

export function printInvoice(business: IBusiness, transaction: ITransaction) {
  print([
    center(business.name.toLocaleUpperCase()),
    center(formatPhone(business.phone)),
    center(business.address),
    newLine(),
    line(),
    center('FACTURA'),
    line(),
    newLine(),
    colums('Compañía', transaction.product.name),
    colums('No. contrato', transaction.contract!.nic),
    colums('Titular', transaction.contract!.name),
    colums('Monto', formatCurrency(transaction.amount)),
    colums('Fecha', formatDatePart(transaction.date)),
    colums('Hora', formatTime(transaction.date)),
    colums('Referencia', formatRef(transaction.reference!)),
    newLine(),
    line(),
    center(transaction.cancelled ? 'FACTURA CANCELADA' : '¡Gracias por su compra!'),
    newLine()
  ]);
}
