import React from 'react';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { DepositItem } from '../../components/deposit-item/deposit-item.component';
import { style } from './deposits.module.css';
import { FloatButton } from '@recargas-dominicanas/core/components';
import { useHistory } from 'react-router-dom';
import { getDeposits, useFetchDeposits } from '../../store/deposits.slice';

interface Props {
  onOpenDrawer: () => void;
}

export function Deposits(props: Props) {

  const { onOpenDrawer } = props;

  const history = useHistory();
  const deposits = getDeposits();
  const fetchDeposits = useFetchDeposits();

  useAsyncEffect(async () => {
    await fetchDeposits();
  });

  return (
    <div className={style.container}>
      <AppToolbar icon='menu' title='Depositos' onClick={onOpenDrawer}/>
      <div className={style.content}>
        {deposits?.map(deposit =>
          <DepositItem
            key={deposit.id}
            deposit={deposit}/>
        )}
      </div>
      <FloatButton 
        icon='post_add'
        onClick={() => history.push('/add-deposit')}/>
    </div>
  );
}
