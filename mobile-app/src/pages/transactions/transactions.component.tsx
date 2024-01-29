import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeList } from 'react-window';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import { formatDay, useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { useTransactions } from '@recargas-dominicanas/core/store';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { TransactionItem } from '../../components/transaction-item/transaction-item.component';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { style } from './transactions.module.css';

interface Props {
  onOpenDrawer: () => void;
}

export function Transactions(props: Props) {

  const Transactions = useTransactions();
  const transactionGroups = Transactions.getAll();
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation<{ animate?: boolean }>();
  const animate = location.state?.animate;
  const [height, setHeight] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(transactionGroups.length);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.history.replaceState({}, '');
  }, []);

  useAsyncEffect(async () => {
    const transactions = await BusinessUserApi.getTransactions(0, 0);
    setTotal((transactions as any).total);
  });

  const measuredRef = useCallback(element => {
    if (element) {
      setHeight(element.getBoundingClientRect().height);
    }
  }, []);

  const list = useMemo(() => {
    return transactionGroups.reduce<(string | ITransaction)[]>((list, item) => 
      [...list, item.date, ...item.transactions], 
    []);
  }, [transactionGroups]);

  function getItemSize(index: number) {
    return typeof list[index] === 'string' ? 64 : 80;
  }

  async function handleFetchTransactions() {

    if (isLoading) return;

    setIsLoading(true);

    const transactions = await BusinessUserApi.getTransactions(page + 1, 25);
    Transactions.add(transactions.data);
    setPage((transactions as any).page);
    
    setIsLoading(false);
  }

  function canAnimate() {
    return animate === undefined || (animate !== undefined && animate !== false); 
  }

  return (
    <CSSTransition
      in={true}
      appear={true}
      unmountOnExit={true}
      nodeRef={ref}
      classNames={canAnimate() ? style.pageAnimation : undefined}
      timeout={200}>
      <div 
        className={style.container}
        ref={ref}>
        <AppToolbar 
          icon='menu' 
          title='Transacciones'
          onClick={props.onOpenDrawer}/>
        <div 
          className={style.content}
          ref={measuredRef}>
          <InfiniteLoader
            isItemLoaded={(index) => index < list.length}
            itemCount={total}
            loadMoreItems={handleFetchTransactions}>
            {({ onItemsRendered, ref }) =>
              <VariableSizeList
                className={style.list}
                width='100%'
                height={height}
                itemCount={list.length}
                itemSize={getItemSize}
                ref={ref}
                onItemsRendered={onItemsRendered}>
                {({ index, style: itemStyle }) => {
                  const item = list[index];
                  return (
                    <div style={itemStyle as any}>
                      {typeof item === 'string' &&
                        <div className={style.date}>{formatDay(item)}</div>
                      }
                      {typeof item === 'object' &&
                        <TransactionItem 
                          key={item.id}
                          transaction={item}/>
                      }
                    </div>
                  );
                }}
              </VariableSizeList>
            }
          </InfiniteLoader>
        </div>
      </div>
    </CSSTransition>
  );
}
