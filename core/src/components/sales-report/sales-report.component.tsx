import React from 'react';
import { Text } from '../text/text.component';
import { formatCurrency } from '../../utils/formatCurrency';
import { Style, mergeStyle } from './sales-report.module.css';

interface Props {
  style?: Style,
  balance?: number,
  sales?: number,
  profit?: number
}

export function SalesReport(props: Props) {

  const {
    style: customStyle,
    balance = 0,
    sales = 0,
    profit = 0
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <div className={style.item}>
        <Text className={style.title} text='Balance'/>
        <Text className={style.amount} text={formatCurrency(balance)}/>
      </div>
      <div className={style.item}>
        <Text className={style.title} text='Venta'/>
        <Text className={style.amount} text={formatCurrency(sales)}/>
      </div>
      <div className={style.item}>
        <Text className={style.title} text='Beneficio'/>
        <Text className={style.amount} text={formatCurrency(profit)}/>
      </div>
    </div>
  );
}
