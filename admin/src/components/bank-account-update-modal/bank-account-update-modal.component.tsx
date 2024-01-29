import React, { useEffect, useState } from 'react';
import { TextField } from '@recargas-dominicanas/core/components';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { Modal } from '../modal/modal.component';
import { style } from './bank-account-update-modal.module.css';

interface Props {
  open: boolean;
  bankAccount?: IBankAccount;
  onSave: (id: number, bankAccount: any) => Promise<void>;
  onClose: () => void;
}

export function BankAccountUpdateModal(props: Props) {

  const {
    open,
    bankAccount,
    onSave,
    onClose
  } = props;

  if (!open || !bankAccount) return null;

  const form = useForm({ name: '', accountNumber: '' });
  const [error, setError] = useState<string>();

  useEffect(() => {
    form.fields.name.update(bankAccount.name);
    form.fields.accountNumber.update(bankAccount.accountNumber);
  }, [bankAccount]);

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleSave() {
    
    if (!form.isValid()) return;

    if (equals()) {
      handleCancel();
      return;
    }

    try {

      await onSave(bankAccount!.id, form.value);

      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al editar la cuenta bancaria');
    }
  }

  function equals() {
    return (
      form.value.name === bankAccount?.name &&
      form.value.accountNumber === bankAccount?.accountNumber
    );
  }

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Editar Cuenta Bancaria'
      error={error}
      primaryButton='Guardar'
      onClose={handleCancel}
      onPrimaryClick={handleSave}
      onSecondaryClick={handleCancel}>
      <TextField
        style={style.textField}
        label='Nombre'
        placeholder='Nombre'
        formField={form.fields.name}
        validators={[validators.required]}/>
      <TextField
        style={style.textField}
        label='Cuenta'
        placeholder='Número'
        formField={form.fields.accountNumber}
        validators={[validators.required]}
        onEnter={handleSave}/>
    </Modal>
  );
}
