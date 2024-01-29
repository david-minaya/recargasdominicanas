import React, { useState } from 'react';
import { ProviderApi } from '@recargas-dominicanas/core/api';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { DateTime, TextField } from '@recargas-dominicanas/core/components';
import { ProviderStore } from '../../../../store/providerStore';
import { Modal } from '../../../../components/modal/modal.component';
import { BankAccountSelect } from '../../../../components/bank-account-select/bank-account-select.component';
import { style } from './register-deposit-modal.module.css';

interface Props {
  open: boolean;
  id: number;
  onClose: () => void;
}

export function RegisterDepositModal(props: Props) {

  const {
    open,
    id,
    onClose
  } = props;

  const [error, setError] = useState<string>();
  const [disabledButton, setDisabledButton] = useState(false);
  const bankAccounts = ProviderStore.getBankAccounts(id);

  const form = useForm({
    bankAccount: undefined as IBankAccount | undefined,
    date: '' as string | undefined,
    description: '',
    balance: ''
  });

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleSave() {
    
    if (!form.isValid()) return;

    setDisabledButton(true);

    try {

      await ProviderApi.registerDeposit(id, {
        bankAccountId: form.value.bankAccount!.id,
        date: new Date(form.value.date!),
        reference: form.value.description,
        balance: parseFloat(form.value.balance)
      });
      
      ProviderStore.fetchDeposits(id);
      ProviderStore.fetchById(id);
      ProviderStore.fetchBankAccounts(id);

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
      title='Registrar tansferencia'
      error={error}
      secondaryButton='Registrar'
      disabledSecondaryButton={disabledButton}
      onClose={handleCancel}
      onSecondaryClick={handleSave}>
      <BankAccountSelect 
        style={style.textField}
        label='Seleccionar cuenta bancaria'
        field={form.fields.bankAccount}
        bankAccounts={bankAccounts}/>
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
        formField={form.fields.description}/>
    </Modal>
  );
}
