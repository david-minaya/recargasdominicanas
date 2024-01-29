import React from 'react';
import { IDeposit } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { style } from './deposits.module.css';

interface Props {
  deposits: IDeposit[];
}

export function Deposits(props: Props) {

  const { deposits } = props;

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <span>Banco</span>
          <span>Balance</span>
          <span>Fecha</span>
          <span>Referencia</span>
        </TableHeader>
        <tbody>
          {
            deposits?.map(deposit => (
              <TableRow key={deposit.id}>
                <CellImage src={deposit.bankAccount.bank.image}/>
                <Cell weight='medium' color='green' text={formatCurrency(deposit.balance.amount)}/>
                <Cell text={formatDate(deposit.date)}/>
                <Cell className={style.reference} text={deposit.reference}/>
              </TableRow>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}
