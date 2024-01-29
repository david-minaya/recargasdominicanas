import React, { useEffect, useRef } from 'react';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { Text } from '@recargas-dominicanas/core/components';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { style } from './transactions.module.css';

interface Props {
  transactions?: ITransaction[]
}

export function Transactions(props: Props) {

  const { transactions } = props;
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef.current) tableRef.current.scrollTop = 0;
  }, [transactions]);
  
  if (!transactions) return null;

  return (
    <div className={style.container}>
      <Table 
        style={style.table}
        refElement={tableRef}>
        <TableHeader style={style.tableHeader}>
          <Text text='Comp.'/>
          <Text text='Teléfono'/>
          <Text text='Monto'/>
          <Text text='Tipo'/>
          <Text text='Fecha'/>
          {transactions[0]?.business && <Text text='Negocio'/>}
          <Text text='Estado'/>
        </TableHeader>
        <tbody>
          {
            transactions.map(transaction => (
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
                {transaction.business && <Cell text={transaction.business.name}/>}
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
  );
}
