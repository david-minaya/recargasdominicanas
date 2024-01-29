import React, { useEffect, useState } from 'react';
import { TextField } from '@recargas-dominicanas/core/components';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { Modal } from '../../../components/modal/modal.component';
import { style } from './edit-bank-account-modal.module.css';

interface Props {
  open: boolean;
  title: string;
  button: string;
  bankAccount?: { name: string, accountNumber: string };
  error?: string;
  onSave: (name: string, accountNumber: string) => Promise<void>;
  onClose: () => void;
}

export function EditBankAccountModal(props: Props) {

  const {
    open,
    title,
    button,
    error: errorMessage,
    bankAccount,
    onSave,
    onClose
  } = props;

  const [error, setError] = useState<string>();
  const form = useForm({ name: '', accountNumber: '' });

  useEffect(() => {
    form.fields.name.update(bankAccount?.name || '');
    form.fields.accountNumber.update(bankAccount?.accountNumber || '');
  }, [open]);

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleSave() {
    
    if (!form.isValid()) return;

    try {

      await onSave(form.value.name, form.value.accountNumber);
      
      handleCancel();

    } catch (err) {

      setError(errorMessage);
    }
  }

  return (
    <Modal
      open={open}
      style={style.modal}
      title={title}
      error={error}
      secondaryButton={button}
      onClose={handleCancel}
      onSecondaryClick={handleSave}>
      <TextField
        style={style.textField}
        label='Nombre'
        formField={form.fields.name}
        validators={[validators.required]}/>
      <TextField
        style={style.textField}
        label='Número de cuenta'
        formField={form.fields.accountNumber}
        validators={[validators.required]}
        onEnter={handleSave}/>
    </Modal>
  );
}
