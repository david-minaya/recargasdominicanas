import React, { Fragment, useEffect, useRef } from 'react';
import emptyIcon from '../../images/history.svg';
import { useTransactions } from '@recargas-dominicanas/core/store';
import { PinRow } from '../../components/pin-row/pin-row.component';
import { TopupRow } from '../../components/topup-row/topup-row.component';
import { InvoiceRow } from '../../components/invoice-row/invoice-row.component';
import { DataPlanRow } from '../../components/data-plan-row/data-plan-row.component';
import { Empty } from '../../components/empty/empty.components';
import { Error } from '../../components/error/error.component';
import { style } from './transactions.module.css';

import {
  OutlineCard,
  PageContainer, 
  PageContent, 
  PageToolbar, 
  Pagination, 
  Table, 
  TableHeader, 
  Title 
} from '@recargas-dominicanas/core/components';

export function Transactions() {

  const store = useTransactions();
  const page = store.getPage();
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    store.fetchPage(1, 50);
  }, []);

  useEffect(() => {
    tableRef.current?.scroll(0, 0);
  }, [page.index]);

  function handleFetch(page: number, size: number) {
    store.fetchPage(page, size);
  }

  function handleRefetch() {
    store.fetchPage(page.index, page.size);
  }

  return (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <Title
          style={style.title} 
          title='Transacciones'/>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineCard className={style.outlineCard}>
          <div className={style.tableContainer}>
            <Table 
              refElement={tableRef}
              style={style.table}>
              <TableHeader style={style.tableHeader}>
                <span>Comp.</span>
                <span>Número</span>
                <span>Tipo</span>
                <span>Hora</span>
                <span>Monto</span>
                <span>Estado</span>
                <span></span>
              </TableHeader>
              <tbody>
                {page.transactions.map(transaction =>
                  <Fragment key={transaction.id}>
                    {transaction.product.type === 'Recarga' &&
                      <TopupRow transaction={transaction}/>
                    }
                    {transaction.product.type === 'Paquetico' &&
                      <DataPlanRow transaction={transaction}/>
                    }
                    {transaction.product.type === 'Pin' &&
                      <PinRow transaction={transaction}/>
                    }
                    {transaction.product.type === 'Factura' &&
                      <InvoiceRow transaction={transaction}/>
                    }
                  </Fragment>
                )}
              </tbody>
            </Table>
            {page.successful && page.count === 0 &&
              <Empty
                image={emptyIcon}
                title='No hay datos para mostrar'
                description='Aun no ha realizado ventas'/>
            }
            {page.error &&
              <Error
                className={style.error} 
                onClick={handleRefetch}/>
            }
          </div>
          <Pagination
            title='Transacciones'
            index={page.index}
            pages={page.pages}
            size={page.size}
            count={page.count}
            onChange={handleFetch}/>
        </OutlineCard>
      </PageContent>
    </PageContainer>
  );
}
