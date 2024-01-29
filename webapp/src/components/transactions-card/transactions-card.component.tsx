import React, { Fragment, useEffect, useRef, useState } from 'react';
import emptyIcon from '../../images/history.svg';
import { CircularProgress } from '@rmwc/circular-progress';
import { formatDay } from '@recargas-dominicanas/core/utils';
import { useTransactions } from '@recargas-dominicanas/core/store';
import { OutlineCard, Title } from '@recargas-dominicanas/core/components';
import { DataPlanItem } from '../data-plan-item/data-plan-item.component';
import { TopupItem } from '../topup-item/topup-item.component';
import { PinItem } from '../pin-item/pin-item.component';
import { InvoiceItem } from '../invoice-item/invoice-item.component';
import { Empty } from '../empty/empty.components';
import { style } from './transactions-card.module.css';
import { Error } from '../error/error.component';

export function TransactionsCard() {

  const transactionStore = useTransactions();
  const groupByDay = transactionStore.getGroupByDay();
  const ref = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [page] = useState({ index: 1 });

  useEffect(() => {
    
    page.index = groupByDay.index;
    
    if (groupByDay.index === 1) {
      ref.current?.scroll(0, 0);
    }
  }, [groupByDay.index]);

  useEffect(() => {

    let isLoading = false;

    const options: IntersectionObserverInit = {
      root: ref.current,
      rootMargin: '0% 0% 100% 0%',
      threshold: 0,    
    };

    const observer = new IntersectionObserver(async ([entry]) => {
      const hasScroll = ref.current!.scrollHeight > ref.current!.offsetHeight;
      if (entry.isIntersecting && !isLoading && hasScroll) {
        isLoading = true;
        transactionStore.fetchGroupByDay(page.index + 1, 50);
        isLoading = false;
      }
    }, options);

    observer.observe(anchorRef.current!);

    return () => observer.disconnect();
  }, []);

  function handleRefetch() {
    transactionStore.fetchGroupByDay(groupByDay.index + 1, 50);
  }

  return (
    <OutlineCard className={style.container}>
      <Title title='Transacciones' style={style.title}/>
      <div
        ref={ref} 
        className={style.transactions}>
        {groupByDay.groups.map(({ date, transactions }, index) =>
          <Fragment key={index}>
            <Title style={style.groupTitle} title={formatDay(date)}/>
            {transactions.map((transaction) =>
              <Fragment key={transaction.id}>
                {transaction.product.type === 'Recarga' &&
                  <TopupItem transaction={transaction}/>
                }
                {transaction.product.type === 'Paquetico' &&
                  <DataPlanItem transaction={transaction}/>
                }
                {transaction.product.type === 'Pin' &&
                  <PinItem transaction={transaction}/>
                }
                {transaction.product.type === 'Factura' &&
                  <InvoiceItem transaction={transaction}/>
                }
              </Fragment>
            )}
          </Fragment>
        )}
        {groupByDay.successful && groupByDay.groups.length === 0 &&
          <Empty
            image={emptyIcon}
            title='No hay datos para mostrar'
            description='Aun no ha realizado ventas'/> 
        }
        {groupByDay.error && groupByDay.groups.length === 0 &&
          <Error
            className={style.error} 
            onClick={handleRefetch}/>
        }
        {groupByDay.loading && groupByDay.groups.length > 0 &&
          <CircularProgress
            className={style.circularProgress}
            size={44}/>
        }
        {groupByDay.error && groupByDay.groups.length > 0 &&
          <Error
            ref={el => el?.scrollIntoView({ block: 'end', behavior: 'smooth' })} 
            onClick={handleRefetch}/>
        }
        <div 
          ref={anchorRef} 
          style={{ height: '1px' }}/>
      </div>
    </OutlineCard>
  );
}
