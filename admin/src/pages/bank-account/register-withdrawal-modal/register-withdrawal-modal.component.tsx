import React, { useState } from 'react';
import { BankAccountApi } from '@recargas-dominicanas/core/api';
import { DateTime, TextField } from '@recargas-dominicanas/core/components';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { BankAccountStore } from '../../../store/bankAccountStore';
import { Modal } from '../../../components/modal/modal.component';
import { style } from './register-withdrawal-modal.module.css';

interface Props {
  open: boolean;
  bankAccountId: number;
  balance: number;
  onClose: () => void;
}

export function RegisterWithdrawalModal(props: Props) {

  const {
    open,
    bankAccountId,
    balance,
    onClose
  } = props;

  const [error, setError] = useState<string>();
  const [disabledButton, setDisabledButton] = useState(false);

  const form = useForm({
    date: '' as string | undefined,
    balance: '',
    description: ''
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

      await BankAccountApi.registerWithdrawal(bankAccountId, {
        balance: parseInt(form.value.balance),
        date: new Date(form.value.date!),
        description: form.value.description
      });

      BankAccountStore.fetchById(bankAccountId);
      BankAccountStore.fetchWithdrawals(bankAccountId, 1, 100);

      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al registrar el retiro');
    }

    setDisabledButton(false);
  }

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Registrar retiro'
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
        validators={[
          validators.required,
          validators.max(balance)
        ]}/>
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
