import React, { useEffect } from 'react';
import { Cell, Pagination, Table, TableHeader, TableRow, Text } from '@recargas-dominicanas/core/components';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { BankAccountStore } from '../../../store/bankAccountStore';
import { style } from './withdrawals.module.css';

interface Props {
  id: number;
}

export function Withdrawals(props: Props) {

  const withdrawalsPage = BankAccountStore.getWithdrawals(props.id);

  useEffect(() => {
    BankAccountStore.fetchWithdrawals(props.id, 1, 100);
  }, [props.id]);

  async function handleFetch(page: number, size: number) {
    await BankAccountStore.fetchWithdrawals(props.id, page, size);
  }

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <Table style={style.table}>
          <TableHeader style={style.tableHeader}>
            <Text text='Balance'/>
            <Text text='Fecha'/>
            <Text text='Descripción'/>
          </TableHeader>
          <tbody>
            {
              withdrawalsPage?.data.map(withdrawal => 
                <TableRow 
                  key={withdrawal.id} 
                  style={style.tableRow}>
                  <Cell weight='medium' color='green' text={formatCurrency(withdrawal.balance.amount)}/>
                  <Cell text={formatDate(withdrawal.date)}/>
                  <Cell className={style.description} text={withdrawal.description}/>
                </TableRow>
              )
            }
          </tbody>
        </Table>
      </div>
      {withdrawalsPage && 
        <Pagination
          title='Retiros'
          index={withdrawalsPage.index}
          pages={withdrawalsPage.pages}
          count={withdrawalsPage.count}
          size={withdrawalsPage.size}
          onChange={handleFetch}/>
      }
    </div>
  );
}
