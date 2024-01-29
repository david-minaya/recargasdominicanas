import React from 'react';
import { useHistory } from 'react-router-dom';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionItem as Item } from '@recargas-dominicanas/core/components';
import { style } from './transaction-item.module.css';

interface Props {
  transaction: ITransaction;
}

export function TransactionItem(props: Props) {

  const {
    transaction
  } = props;

  const history = useHistory();

  async function handleClick() {

    if (transaction.product.type === 'Recarga') {
      history.push(`/topup-details/${transaction.id}`);
      return;
    }
    
    if (transaction.product.type === 'Paquetico') {
      history.push(`/data-plan-details/${transaction.id}`);
      return;
    }

    if (transaction.product.type === 'Pin') {
      history.push(`/pin-details/${transaction.id}`);
    }

    if (transaction.product.type === 'Factura') {
      history.push(`/invoice-details/${transaction.id}`);
      return;
    }
  }

  return (
    <Item
      key={transaction.id}
      style={style.transactionItem}
      transaction={transaction}
      showMenu={false}
      onClick={handleClick}/>
  );
}
