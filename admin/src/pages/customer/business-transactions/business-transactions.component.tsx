import React from 'react';
import { Pagination } from '@recargas-dominicanas/core/components';
import { Transactions } from '../../../components/transactions/transactions.component';
import { BusinessStore } from '../../../store/businessStore';
import { style } from './business-transactions.module.css';

interface Props {
  id: number;
}

export function BusinessTransactions(props: Props) {

  const { id } = props;

  const page = BusinessStore.getTransactionsPage(id);

  async function handleFetchTransactions(page: number, size: number) {
    await BusinessStore.fetchTransactions(id, page, size);
  }

  if (!page) return null;

  return (
    <div className={style.container}>
      <Transactions 
        transactions={page.data}/>
      <Pagination
        title='Transacciones'
        index={page.index}
        pages={page.pages}
        count={page.count}
        size={page.size}
        onChange={handleFetchTransactions}/>
    </div>
  );
}
