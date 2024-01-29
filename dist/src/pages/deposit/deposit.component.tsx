import React, { Fragment, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { style } from './deposit.module.css';
import { Image, OutlineButton } from '@recargas-dominicanas/core/components';
import { Divider } from '../../components/divider/divider.component';
import { formatCurrency, formatDate, formatId } from '@recargas-dominicanas/core/utils';
import { Info } from '../../components/info/info.component';
import { InfoItem } from '../../components/info-item/info-item.component';
import { AssignDepositModal } from '../../components/assign-deposit-modal/assign-deposit-modal.component';
import { getDeposit } from '../../store/deposits.slice';

export function Deposit() {

  const history = useHistory();
  const location = useLocation<{ id: number }>();
  const deposit = getDeposit(location.state?.id);
  const [openAssignModal, setOpenAssignModal] = useState(false);

  if (!deposit) {
    return <Redirect to='/deposits'/>;
  }

  return (
    <div className={style.container}>
      <AppToolbar 
        icon='arrow_back' 
        title='Deposito' 
        onClick={() => history.goBack()}/>
      <div className={style.content}>
        <div className={style.bankAccount}>
          <Image 
            className={style.bankAccountImage} 
            src={deposit.bankAccount.bank.image}/>
          <div className={style.bankAccountInfo}>
            <div className={style.bankAccountName}>{deposit.bankAccount.name}</div>
            <div className={style.bankAccountNumber}>{deposit.bankAccount.accountNumber}</div>
          </div>
        </div>
        <Divider/>
        <div className={style.balanceTitle}>Balance</div>
        <div className={style.balance}>{formatCurrency(deposit.balance.amount)}</div>
        <Divider/>
        <Info title='Información'>
          <InfoItem title='Fecha' value={formatDate(deposit.date)}/>
          <InfoItem title='Referencia' value={deposit.reference}/>
          {deposit.business &&
            <Fragment>
              <InfoItem title='Negocio' value={deposit.business.name}/>
              <InfoItem title='Id' value={formatId(deposit.business.id)}/>
            </Fragment> 
          }
        </Info>
        {!deposit.business &&
          <OutlineButton
            style={style.button} 
            text='Asignar'
            onClick={() => setOpenAssignModal(true)}/>
        }
      </div>
      <AssignDepositModal
        open={openAssignModal}
        deposit={deposit}
        onClose={() => setOpenAssignModal(false)}/>
    </div>
  );
}
