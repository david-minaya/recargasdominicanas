import React from 'react';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { BusinessStore } from '../../store/businessStore';
import { style } from './deposits.module.css';

interface Props {
  id: number;
}

export function Deposits(props: Props) {

  const deposits = BusinessStore.getDeposits(props.id);

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <span>Banco</span>
          <span>Balance</span>
          <span>Fecha</span>
        </TableHeader>
        <tbody>
          {
            deposits?.map(deposit => (
              <TableRow key={deposit.id}>
                <CellImage src={deposit.bankAccount.bank.image}/>
                <Cell weight='medium' color='green' text={formatCurrency(deposit.balance.amount)}/>
                <Cell text={formatDate(deposit.date)}/>
              </TableRow>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}
