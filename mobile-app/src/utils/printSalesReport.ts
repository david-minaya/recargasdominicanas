import { IBusiness, ISalesReport } from '@recargas-dominicanas/core/types';
import { formatPhone, formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { print } from '../plugins/printer';

export async function printSalesReport(business: IBusiness, salesReport: ISalesReport) {
  await print(`
    <text value="${business.name.toLocaleUpperCase()}" align="center" bold="true" size="large"/>
    <text value="${formatPhone(business.phone)}" align="center"/>
    <text value="${business.address}" align="center"/>
    <new-line/>
    <horizontal-line/>
    <text value="Cierre de ventas" align="center" size="large"/>
    <horizontal-line/>
    <new-line/>
    <col text1="Balance" text2="${formatCurrency(salesReport.balance)}"/>
    <col text1="Ventas" text2="${formatCurrency(salesReport.sales)}"/>
    <col text1="Consumo" text2="${formatCurrency(salesReport.sales - salesReport.profit)}"/>
    <col text1="Beneficio" text2="${formatCurrency(salesReport.profit)}"/>
    <new-line/>
    <horizontal-line/>
    <new-line/>
    <text value="${formatDate(salesReport.date)}" align="center"/>
    <new-line/>
    <new-line/>
    <new-line/>
  `);
}
