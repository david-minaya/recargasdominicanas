import React, { useEffect } from 'react';
import { ProviderStore } from '../../../store/providerStore';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { style } from './transactions.module.css';

import { 
  Cell, 
  CellImage, 
  Pagination, 
  Table, 
  TableHeader, 
  TableRow,
  Text
} from '@recargas-dominicanas/core/components';

interface Props {
  id: number;
}

export function Transactions(props: Props) {

  const page = ProviderStore.getTransactionsPage(props.id);

  useEffect(() => {
    ProviderStore.fetchTransactions(props.id, 1, 100);
  }, [props.id]);

  async function handleFetchTransactions(page: number, size: number) {
    ProviderStore.fetchTransactions(props.id, page, size);
  }

  return (
    <div className={style.container}>
      <div className={style.tableContainer}>
        <Table 
          style={style.table}>
          <TableHeader style={style.tableHeader}>
            <Text text='Comp.'/>
            <Text text='Teléfono'/>
            <Text text='Monto'/>
            <Text text='Tipo'/>
            <Text text='Fecha'/>
            <Text text='Negocio'/>
            <Text text='Estado'/>
          </TableHeader>
          <tbody>
            {
              page?.data.map(transaction => (
                <TableRow key={transaction.id} style={style.tableRow}>
                  <CellImage src={transaction.product.image}/>
                  {(transaction.product.type === 'Recarga' || transaction.product.type === 'Paquetico') &&
                    <Cell className={style.phone} text={transaction.phone}/>
                  }
                  {transaction.product.type === 'Pin' &&
                    <Cell className={style.phone} text='* * * * * * * *'/>
                  }
                  {transaction.product.type === 'Factura' &&
                    <Cell className={style.phone} text={transaction.contract?.nic}/>
                  }
                  <Cell weight='medium' color='green' text={formatCurrency(transaction.amount)}/>
                  <Cell text={transaction.product.type}/>
                  <Cell text={formatDate(transaction.date)}/>
                  <Cell text={transaction.business!.name}/>
                  {transaction.cancelled
                    ? <Cell color='red' weight='medium' text='Cancelada'/>
                    : <Cell color='darkgray' text='Realizada'/>
                  }
                </TableRow>
              ))
            }
          </tbody>
        </Table>
      </div>
      {page &&
        <Pagination
          title='Transacciones'
          index={page.index}
          pages={page.pages}
          count={page.count}
          size={page.size}
          onChange={handleFetchTransactions}/>
      }
    </div>
  );
}
