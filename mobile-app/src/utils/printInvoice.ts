import { IBusiness, ITransaction } from '@recargas-dominicanas/core/types';
import { print } from '../plugins/printer';

import { 
  formatCurrency,
  formatPhone,
  formatRef,
  formatTime 
} from '@recargas-dominicanas/core/utils';

export async function printInvoice(business: IBusiness, transaction: ITransaction) {
  await print(`
    <text value="${business.name.toLocaleUpperCase()}" align="center" bold="true" size="large"/>
    <text value="${formatPhone(business.phone)}" align="center"/>
    <text value="${business.address}" align="center"/>
    <new-line/>
    <horizontal-line/>
    <text value="${transaction.product.type.toLocaleUpperCase()}" align="center" size="large"/>
    <horizontal-line/>
    <new-line/>
    <col text1="Compañía" text2="${transaction.product.name}"/>
    <col text1="No. contrato" text2="${transaction.contract?.nic}"/>
    <col text1="Titular" text2="${transaction.contract?.name}"/>
    <col text1="Monto" text2="${formatCurrency(transaction.amount)}"/>
    <col text1="Fecha" text2="${formatDate(transaction.date)}"/>
    <col text1="Hora" text2="${formatTime(transaction.date)}"/>
    <col text1="Referencia" text2="${formatRef(transaction.reference || 0)}"/>
    <new-line/>
    <horizontal-line/>
    <new-line/>
    ${footer(transaction.cancelled)}
    <new-line/>
    <new-line/>
    <new-line/>
  `);
}

function footer(cancelled: boolean) {
  return !cancelled
    ? '<text value="!Gracias por su compra¡" align="center" bold="true"/>'
    : '<text value="Factura Cancelada" align="center" bold="true"/>';
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-DO', { 
    // @ts-ignore
    dateStyle: 'medium'
  }).format(new Date(date));
}
