import React, { useEffect } from 'react';
import { Cell, Pagination, Table, TableHeader, TableRow, Text } from '@recargas-dominicanas/core/components';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { BankAccountStore } from '../../../store/bankAccountStore';
import { style } from './deposits.module.css';

interface Props {
  id: number;
}

export function Deposits(props: Props) {

  const depositsPage = BankAccountStore.getDeposits(props.id);

  useEffect(() => {
    BankAccountStore.fetchDeposits(props.id, 1, 100);
  }, [props.id]);

  function handleFetch(page: number, size: number) {
    BankAccountStore.fetchDeposits(props.id, page, size);
  }

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <Table style={style.table}>
          <TableHeader style={style.tableHeader}>
            <Text text='Balance'/>
            <Text text='Fecha'/>
            <Text text='Negocio'/>
            <Text text='Descripción'/>
          </TableHeader>
          <tbody>
            {
              depositsPage?.data.map(deposit => 
                <TableRow 
                  key={deposit.id} 
                  style={style.tableRow}>
                  <Cell weight='medium' color='green' text={formatCurrency(deposit.balance.amount)}/>
                  <Cell text={formatDate(deposit.date)}/>
                  <Cell text={deposit.business?.name || ''}/>
                  <Cell className={style.description} text={deposit.reference}/>
                </TableRow>
              )
            }
          </tbody>
        </Table>
      </div>
      {depositsPage &&
        <Pagination
          title='Depositos'
          index={depositsPage.index}
          pages={depositsPage.pages}
          count={depositsPage.count}
          size={depositsPage.size}
          onChange={handleFetch}/>
      }
    </div>
  );
}
