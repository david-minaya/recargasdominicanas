import React, { useState } from 'react';
import { BankAccountApi, BusinessApi } from '@recargas-dominicanas/core/api';
import { Autocomplete, DateTime, SelectOption, TextField } from '@recargas-dominicanas/core/components';
import { useAsyncEffect, useForm, validators } from '@recargas-dominicanas/core/utils';
import { BankAccountStore } from '../../../store/bankAccountStore';
import { Modal } from '../../../components/modal/modal.component';
import { IBusiness } from '@recargas-dominicanas/core/types';
import { style } from './register-deposit-modal.module.css';

interface Props {
  open: boolean;
  bankAccountId: number;
  onClose: () => void;
}

export function RegisterDepositModal(props: Props) {

  const {
    open,
    bankAccountId,
    onClose
  } = props;

  const [error, setError] = useState<string>();
  const [business, setBusiness] = useState<IBusiness[]>();
  const [disabledButton, setDisabledButton] = useState(false);

  const form = useForm({
    date: '' as string | undefined,
    balance: '',
    businessId: '',
    reference: '',
  });

  useAsyncEffect(async () => {
    setBusiness(await BusinessApi.search(''));
  });

  async function handleSearch(value?: string) {
    setBusiness(await BusinessApi.search(value));
  }

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleSave() {
    
    if (!form.isValid()) return;

    setDisabledButton(true);

    try {

      await BankAccountApi.registerDeposit(bankAccountId, {
        balance: parseInt(form.value.balance),
        date: new Date(form.value.date!),
        businessId: form.value.businessId ? parseInt(form.value.businessId) : undefined,
        reference: form.value.reference
      });

      BankAccountStore.fetchById(bankAccountId);
      BankAccountStore.fetchDeposits(bankAccountId, 1, 100);

      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al registrar el deposito');
    }

    setDisabledButton(false);
  }

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Registrar deposito'
      error={error}
      secondaryButton='Registrar'
      disabledSecondaryButton={disabledButton}
      onClose={handleCancel}
      onSecondaryClick={handleSave}>
      <TextField
        style={style.textField}
        label='Balance'
        type='number'
        formField={form.fields.balance}
        validators={[validators.required]}/>
      <DateTime
        style={style.dateTime}
        label='Fecha'
        placeholder='Seleccionar fecha'
        type='datetime-local'
        formField={form.fields.date}
        required={true}/>
      <TextField
        style={style.textField}
        label='Descripción'
        formField={form.fields.reference}/>
      <Autocomplete
        style={style.autocomplete}
        label='Asignar a'
        icon='storefront'
        placeholder='Seleccionar negocio'
        formField={form.fields.businessId}
        onSearch={handleSearch}>
        { 
          business?.map(business => (
            <SelectOption 
              key={business.id}
              value={business.id} 
              label={business.name}>
              <div className={style.businessItem}>
                <span className={style.businessId}>{business.id.toString().padStart(2, '0')}</span>
                <span className={style.businessName}>{business.name}</span>
              </div>
            </SelectOption>
          ))
        }
      </Autocomplete>
    </Modal>
  );
}
