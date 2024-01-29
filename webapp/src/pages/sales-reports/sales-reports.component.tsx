import React, { useEffect, useRef } from 'react';
import emptyIcon from '../../images/receipt_long.svg';
import { useSalesReport } from '@recargas-dominicanas/core/store';
import { SalesReportRow } from '../../components/sales-report-row/sales-report-row.component';
import { Empty } from '../../components/empty/empty.components';
import { Error } from '../../components/error/error.component';
import { style } from './sales-reports.module.css';

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

export function SalesReports() {

  const store = useSalesReport();
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
          title='Cierres de venta'/>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineCard className={style.outlineCard}>
          <div className={style.tableContainer}>
            <Table
              refElement={tableRef} 
              style={style.table}>
              <TableHeader style={style.tableHeader}>
                <span>Fecha</span>
                <span>Balance</span>
                <span>Ventas</span>
                <span>Balance consumido</span>
                <span>Beneficio</span>
                <span></span>
              </TableHeader>
              <tbody>
                {page.salesReport.map(salesReport =>
                  <SalesReportRow
                    key={salesReport.id}
                    salesReport={salesReport}/>
                )}
              </tbody>
            </Table>
            {page.successful && page.count === 0 &&
              <Empty
                image={emptyIcon}
                title='No hay datos para mostrar'
                description='Aun no ha realizado cierres de ventas'/> 
            }
            {page.error &&
              <Error
                className={style.error} 
                onClick={handleRefetch}/>
            }
          </div>
          <Pagination
            title='Cierres de venta'
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
