import React from 'react';
import { Image } from '@recargas-dominicanas/core/components';
import { IDeposit } from '@recargas-dominicanas/core/types';
import { style } from './deposit-item.module.css';
import { Divider } from '../divider/divider.component';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { useHistory } from 'react-router-dom';

interface Props {
  deposit: IDeposit;
}

export function DepositItem(props: Props) {

  const { deposit } = props;

  const history = useHistory();

  function handleClick() {
    history.push('/deposit', { id: deposit.id });
  }

  return (
    <div 
      className={style.container}
      onClick={handleClick}>
      <Image className={style.image} src={deposit.bankAccount.bank.image}/>
      <div className={style.data}>
        <div className={style.name}>{deposit.bankAccount.name}</div>
        <div className={style.balance}>{formatCurrency(deposit.balance.amount)}</div>
        <div className={style.date}>{formatDate(deposit.date)}</div>
        {deposit.business &&
          <div className={style.asigned}>Asignado</div>
        }
      </div>
      <Divider className={style.divider}/>
    </div>
  );
}
