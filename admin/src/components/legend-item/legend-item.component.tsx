import React from 'react';
import clsx from 'clsx';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { style } from './legend-item.module.css';

interface Props {
  title: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
  amount?: number;
}

export function LegendItem(props: Props) {

  const {
    title,
    color,
    amount
  } = props;

  return (
    <div className={style.container}>
      <div className={clsx(style.circle, style[color])}/>
      <div className={style.title}>{title}</div>
      {amount !== undefined &&
        <div className={style.amount}>{formatCurrency(amount)}</div>
      }
    </div>
  );
}
