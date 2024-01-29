import React from 'react';
import { style } from './finance-item.module.css';
import { formatCurrency } from '@recargas-dominicanas/core/utils';

interface Props {
  title: string;
  amount?: number;
}

export function FinanceItem(props: Props) {

  const {
    title,
    amount = 0
  } = props;

  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div className={style.amount}>{formatCurrency(amount)}</div>
    </div>
  );
}
