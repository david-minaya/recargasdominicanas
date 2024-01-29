import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SystemApi, BusinessApi, DepositApi } from '@recargas-dominicanas/core/api';
import { IBusiness, IBankAccount } from '@recargas-dominicanas/core/types';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { style } from './add-deposit.module.css';

import { 
  Field, 
  formatCurrency, 
  formatId, 
  useAsyncEffect, 
  useForm, 
  validators 
} from '@recargas-dominicanas/core/utils';

import { 
  Autocomplete, 
  DateTime, 
  Error, 
  OutlineButton, 
  Select, 
  SelectOption, 
  TextField 
} from '@recargas-dominicanas/core/components';

export function AddDeposit() {

  const history = useHistory();
  const businessField = new Field({} as IBusiness);
  const [business, setBusiness] = useState<IBusiness[]>();
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>();
  const [showError, setShowError] = useState(false);

  const form = useForm({
    reference: '',
    date: '',
    balance: '',
    bankAccountId: '',
    userId: ''
  });

  useAsyncEffect(async () => {
    setBankAccounts(await SystemApi.getBankAccounts());
    setBusiness(await BusinessApi.search(''));
  });

  async function handleSearch(value?: string) {
    setBusiness(await BusinessApi.search(value));
  }

  async function handleSave() {

    if (!form.isValid()) return;

    try {

      await DepositApi.add({
        ...form.value,
        date: new Date(form.value.date)
      });

      history.replace('/deposits');

    } catch (err) {

      setShowError(true);
    }
  }

  return (
    <div className={style.container}>
      <AppToolbar 
        icon='arrow_back' 
        title='Registrar deposito'
        onClick={() => history.goBack()}/>
      <div className={style.content}>
        <div className={style.form}>
          <Select
            style={style.select}
            required={true}
            icon='account_balance'
            placeholder='Seleccionar cuenta'
            formField={form.fields.bankAccountId}>
            {bankAccounts?.map((bankAccount) => 
              <SelectOption 
                key={bankAccount.id} 
                value={bankAccount.id}
                label={bankAccount.name}>
                <div className={style.selectItem}>
                  <span className={style.businessName}>{bankAccount.name}</span>
                  <span className={style.balance}>{formatCurrency(bankAccount.balance)}</span>
                </div>
              </SelectOption>
            )}
          </Select>
          <DateTime
            style={style.textField} 
            required={true}
            placeholder='Seleccionar fecha'
            formField={form.fields.date}/>
          <TextField 
            style={style.textField} 
            placeholder='Balance'
            formField={form.fields.balance}
            type='number'
            validators={[
              validators.required,
              validators.min(1000)
            ]}/>
          <TextField 
            style={style.textField} 
            placeholder='Referencia'
            formField={form.fields.reference}/>
          <Autocomplete
            style={style.autocomplete}
            icon='storefront'
            placeholder='Seleccionar negocio'
            formField={businessField}
            onSearch={handleSearch}
            onChange={value => form.fields.userId.updateValue(value?.user.id)}>
            {
              business?.map(business => (
                <SelectOption key={business.id} value={business} label={business.name}>
                  <div className={style.selectItem}>
                    <span className={style.businessName}>{business.name}</span>
                    <span className={style.businessId}>{formatId(business.id)}</span>
                  </div>
                </SelectOption>
              ))
            }
          </Autocomplete>
          <Error
            style={style.error} 
            show={showError} 
            message='No se pudo registrar el deposito'/>
        </div>
        <OutlineButton
          style={style.button} 
          text='Registrar'
          onClick={handleSave}/>
      </div>
    </div>
  );
}
