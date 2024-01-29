import React from 'react';
import { IBusiness } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { useHistory } from 'react-router-dom';
import { Divider } from '../divider/divider.component';
import { style } from './business-item.module.css';

interface Props {
  business: IBusiness;
}

export function BusinessItem(props: Props) {

  const { business } = props;

  const history = useHistory();

  function handleClick() {
    history.push('/business', { id: business.id });
  }

  return (
    <div 
      className={style.container}
      onClick={handleClick}>
      <div className={style.item}>
        <div className={style.businessName}>{business.name}</div>
        <div className={style.id}>{business.id.toString().padStart(4, '0')}</div>
        <div className={style.ownerName}>{business.customer.name}</div>
        <div className={style.balance}>{formatCurrency(business.balance)}</div>
      </div>
      <Divider className={style.divider}/>
    </div>
  );
}
