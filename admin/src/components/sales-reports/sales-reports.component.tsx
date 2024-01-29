import React from 'react';
import { ISalesReport } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { style } from './sales-reports.module.css';
import { Cell } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';

interface Props {
  salesReports?: ISalesReport[]
}

export function SalesReports(props: Props) {

  const { salesReports } = props;

  if (!salesReports) return null;

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <span>Fecha</span>
          <span>Balance</span>
          <span>Venta</span>
          <span>Beneficio</span>
          <span></span>
        </TableHeader>
        <tbody>
          {
            salesReports?.map(salesReport => (
              <TableRow key={salesReport.id}>
                <Cell text={formatDate(salesReport.date)}/>
                <Cell weight='medium' color='green' text={formatCurrency(salesReport.balance)}/>
                <Cell weight='medium' color='green' text={formatCurrency(salesReport.sales)}/>
                <Cell weight='medium' color='green' text={formatCurrency(salesReport.profit)}/>
                <Cell text=''/>
              </TableRow>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}
