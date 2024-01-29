import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { formatCurrency, formatDate, formatPhone } from '@recargas-dominicanas/core/utils';
import { useBusiness, useTransactions } from '@recargas-dominicanas/core/store';
import { OutlineButton, Image, DetailItem } from '@recargas-dominicanas/core/components';
import { printTransaction } from '../../utils/printTransaction';
import { Page } from '../../components/page/page.component';
import { style } from './data-plan-details.module.css';

export function DataPlanDetails() {

  const Business = useBusiness();
  const Transactions = useTransactions();
  const query = useParams<{ id: string }>();
  const business = Business.get();
  const transaction = Transactions.get(parseInt(query.id));

  async function handlePrint() {
    await printTransaction(business, transaction!);
  }

  if (!transaction) {
    return <Redirect to='/'/>;
  }

  return (
    <Page 
      title='Paquetico'
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
          title='Teléfono' 
          text={formatPhone(transaction.phone)}
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
