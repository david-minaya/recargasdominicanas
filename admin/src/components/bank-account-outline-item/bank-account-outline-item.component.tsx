import React from 'react';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { BankAccountSelectItem } from '../bank-account-select-item/bank-account-select-item.component';
import { Style, mergeStyle } from './bank-account-outline-item.module.css';

interface Props {
  style?: Style;
  bankAccount: IBankAccount;
  onClose?: () => void;
}

export function BankAccountOutlineItem(props: Props) {

  const {
    style: customStyle,
    bankAccount,
    onClose
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <BankAccountSelectItem
      style={style}
      bankAccount={bankAccount}
      showCloseIcon={true}
      onClose={onClose}/>
  );
}
