import React from 'react';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { BusinessStore } from '../../store/businessStore';
import { style } from './sales-reports.module.css';

interface Props {
  id: number;
}

export function SalesReports(props: Props) {

  const salesReports = BusinessStore.getSalesReports(props.id);

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
