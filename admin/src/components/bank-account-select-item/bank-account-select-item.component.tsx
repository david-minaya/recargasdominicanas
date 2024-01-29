import React, { MouseEvent } from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { Icon, Image } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './bank-account-select-item.module.css';
import { IBankAccount } from '@recargas-dominicanas/core/types';

interface Props {
  style?: Style;
  bankAccount: IBankAccount;
  showCloseIcon?: boolean;
  onClose?: () => void;
}

export function BankAccountSelectItem(props: Props) {

  const {
    style: customStyle,
    bankAccount,
    showCloseIcon = true,
    onClose
  } = props;

  const style = mergeStyle(customStyle);

  function handleClose(event?: MouseEvent<HTMLDivElement>) {
    event?.stopPropagation();
    onClose?.();
  }

  return (
    <div className={style.container}>
      <Image className={style.image} src={bankAccount.bank.image}/>
      <div className={style.data}>
        <div className={style.row}>
          <span className={style.name}>{bankAccount.name}</span>
          {showCloseIcon && 
            <Icon 
              className={style.closeIcon}
              icon='clear'
              onMouseDown={handleClose}/>
          }
        </div>
        <div className={style.row}>
          <span className={style.account}>{bankAccount.accountNumber}</span>
          <span className={style.balance}>{formatCurrency(bankAccount.balance)}</span>
        </div>
      </div>
    </div>
  );
}
