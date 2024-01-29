import { NOT_FOUND_EXCEPTION } from '../../constants/error-types';
import { CUSTOMER } from '../../constants/permissions';
import { Business } from '../../entities/business.entity';
import { Transaction } from '../../entities/transaction.entity';
import { permission, validate } from '../../middlewares';
import { explicitRes, get, route } from '../../utils/routeBuilder';
import { ServerError } from '../../utils/serverError';
import { date2, number, optional } from '../../utils/validators';
import { Workbook, Worksheet } from 'exceljs';

explicitRes()
permission(CUSTOMER)
validate({ id: number, startDate: [date2, optional], endDate: [date2, optional] })
get('/business/:id/export-transactions')
export const exportBusinessTransactions = route(async (req, res) => {

  const startDate = req.query.startDate as string | undefined;
  const endDate = req.query.endDate as string | undefined;
  const business = await Business.findOne(req.params.id);

  if (!business) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  const transactions = await Transaction.createQueryBuilder('transaction')
    .select([
      'transaction.id',
      'transaction.phone',
      'transaction.amount',
      'transaction.date',
      'transaction.reference',
      'transaction.cancelled',
      'product.name',
      'product.type',
      'product.image',
      'profit.amount',
      'contract.nic'
    ])
    .leftJoin('transaction.business', 'business')
    .leftJoin('transaction.product', 'product')
    .leftJoin('transaction.contract', 'contract')
    .leftJoin('transaction.profits', 'profit')
    .leftJoin('business.customer', 'customer')
    .where('customer.id = :customerId')
    .andWhere('business.id = :businessId')
    .andWhere('DATE(transaction.date) BETWEEN :startDate AND :endDate')
    .andWhere('profit.userId = business.userId')
    .orderBy('transaction.date')
    .setParameters({
      customerId: req.customer.id,
      businessId: req.params.id,
      startDate: startDate || '2020-01-01',
      endDate: endDate || '3020-01-01'
    })
    .getMany();

  if (transactions.length === 0) {
    throw new ServerError(404, NOT_FOUND_EXCEPTION);
  }

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Transacciones');

  worksheet.columns = [
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 10, style: { numFmt: '#,##0.00' } },
    { width: 10, style: { numFmt: '#,##0.00' } },
    { width: 25 },
    { width: 15 }
  ];
  
  worksheet.addRow(['Compañía', 'Tipo', 'Teléfono', 'Monto', 'Beneficio', 'Fecha', 'Estado']);
  setRowStyle(worksheet, 'A1:G1', { background: '5B95F9' });

  let p = 2;
  let totalAmount = 0;
  let totalProfit = 0;

  for (const transaction of transactions) {

    const phone = (() => {
      switch (transaction.product.type) {
        case 'Recarga': return transaction.phone;
        case 'Paquetico': return transaction.phone;
        case 'Pin': return '**********';
        case 'Factura': return transaction.contract.nic;
      }
    })();

    worksheet.addRow([
      transaction.product.name,
      transaction.product.type,
      phone,
      transaction.amount,
      transaction.profits[0].amount,
      transaction.date.toLocaleString('es'),
      transaction.cancelled ? 'Cancelada' : 'Realizada'
    ]);

    if (p % 2 === 0 && !transaction.cancelled) {
      setRowStyle(worksheet, `A${p}:G${p}`, { background: 'E8F0FE', borderColor: 'DDDDDD' });
    }

    if (transaction.cancelled) {
      setRowStyle(worksheet, `A${p}:G${p}`, { background: 'FF9191' });
    }
    
    if (!transaction.cancelled) {
      totalAmount += transaction.amount;
      totalProfit += transaction.profits[0].amount;
    }

    p++;
  }

  worksheet.addRow(['Total', '', '', totalAmount, totalProfit, '', '']);
  setRowStyle(worksheet, `A${p}:G${p}`, { background: '5B95F9', bold: true });

  const startDateFormatted = formatDate(startDate || transactions[0].date);
  const endDateFormatted = formatDate(endDate || transactions[transactions.length - 1].date);
  const filename = `${business?.name} ventas del ${startDateFormatted} al ${endDateFormatted}.xlsx`;
  
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  workbook.xlsx.write(res);
});

function setRowStyle(worksheet: Worksheet, range: string, style: { background?: string, borderColor?: string, bold?: boolean }) {
  worksheet.addConditionalFormatting({
    ref: range,
    rules: [
      {
        type: 'expression',
        priority: 0,
        formulae: ['true'],
        style: {
          fill: {
            type: 'pattern', 
            pattern: 'solid', 
            bgColor: {
              argb: style.background
            }
          },
          font: {
            bold: style.bold
          },
          border: !style.borderColor ? undefined : {
            top: { style:'thin', color: { argb: style.borderColor } },
            left: { style:'thin', color: { argb: style.borderColor } },
            bottom: { style:'thin', color: { argb: style.borderColor } },
            right: { style:'thin', color: { argb: style.borderColor } }
          }
        },
      }
    ]
  });
}

function formatDate(date: string | Date) {
  return new Date(date)
    .toLocaleDateString('es', { timeZone: 'UTC' })
    .replace(/\//g, '-');
}
