import React from 'react';
import { Field } from '@recargas-dominicanas/core/utils';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { Select, SelectOption } from '@recargas-dominicanas/core/components';
import { BankAccountSelectItem } from '../bank-account-select-item/bank-account-select-item.component';
import { Style, mergeStyle } from './bank-account-select.module.css';

interface Props {
  label?: string;
  field?: Field<IBankAccount|undefined>,
  placeholder?: string,
  disabled?: boolean,
  bankAccounts?: IBankAccount[],
  style?: Style
}

export function BankAccountSelect(props: Props) {

  const {
    label,
    field,
    placeholder = 'Seleccionar cuenta bancaria',
    disabled = false,
    bankAccounts,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <Select 
      style={style} 
      icon='account_balance'
      label={label}
      placeholder={placeholder}
      required={true}
      disabled={disabled}
      formField={field}>
      { 
        bankAccounts?.map(bankAccount => (
          <SelectOption
            key={bankAccount.id}
            style={style.selectOption}
            value={bankAccount} 
            label={bankAccount.name}
            showClearIcon={false}>
            <BankAccountSelectItem
              bankAccount={bankAccount}
              showCloseIcon={bankAccount.id === field?.value?.id}
              onClose={() => field?.clear()}/>
          </SelectOption>
        ))
      }
    </Select>
  );
}
