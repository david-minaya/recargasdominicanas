import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { useBusiness, useTransactions } from '@recargas-dominicanas/core/store';
import { OutlineButton, Image, DetailItem } from '@recargas-dominicanas/core/components';
import { Page } from '../../components/page/page.component';
import { printPin } from '../../utils/printPin';
import { style } from './pin-details.module.css';

export function PinDetails() {

  const Business = useBusiness();
  const Transactions = useTransactions();
  const query = useParams<{ id: string }>();
  const business = Business.get();
  const transaction = Transactions.get(parseInt(query.id));

  async function handlePrint() {
    await printPin(business, { ...transaction!, pin: '*******' });
  }

  if (!transaction) {
    return <Redirect to='/'/>;
  }

  return (
    <Page 
      title='Pin'
      animate={true}>
      <div className={style.product}>
        <Image 
          className={style.productImage} 
          src={transaction.product.image}/>
        <span className={style.productName}>
          {transaction.product.name}
        </span>
      </div>
      <div className={style.items}>
        <DetailItem
          style={style.detailItem} 
          title='Pin' 
          text='* * * * * * * * * *'
          weight='medium'/>  
        <DetailItem 
          style={style.detailItem}
          title='Monto' 
          text={formatCurrency(transaction.amount)}
          color='green'
          weight='medium'/>
        <DetailItem
          style={style.detailItem}
          title='Beneficio' 
          text={formatCurrency(transaction.profit)}
          color='green'
          weight='medium'/>
        <DetailItem
          style={style.detailItem}
          title='Fecha'
          text={formatDate(transaction.date)}
          weight='medium'/>
      </div>
      <div className={style.buttonsContainer}>
        <OutlineButton
          style={style.button}
          icon='receipt'
          text='Reimprimir recibo'
          onClick={handlePrint}/>
      </div>
    </Page>
  );
}
