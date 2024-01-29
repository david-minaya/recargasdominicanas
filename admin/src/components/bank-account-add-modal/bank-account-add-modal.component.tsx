import React, { useState } from 'react';
import { Select, SelectOption, TextField, Image } from '@recargas-dominicanas/core/components';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { BankStore } from '../../store/bankStore';
import { Modal } from '../modal/modal.component';
import { style } from './bank-account-add-modal.module.css';

interface Props {
  open: boolean;
  onSave: (bankAccount: any) => Promise<void>;
  onClose: () => void;
}

export function BankAccountAddModal(props: Props) {

  const {
    open,
    onSave,
    onClose
  } = props;

  const form = useForm({
    name: '',
    accountNumber: '',
    bankId: ''
  });

  const banks = BankStore.getAll();
  const [error, setError] = useState<string>();

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleSave() {
    
    if (!form.isValid()) return;

    try {

      await onSave(form.value);
      
      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al agregar la cuenta bancaria');
    }
  }

  if (!open) return null;

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Agregar cuenta bancaria'
      error={error}
      primaryButton='Agregar'
      onClose={handleCancel}
      onPrimaryClick={handleSave}
      onSecondaryClick={handleCancel}>
      <Select 
        style={style.select} 
        icon='account_balance'
        placeholder='Banco'
        required={true}
        formField={form.fields.bankId}>
        { 
          banks?.map(bank => (
            <SelectOption
              key={bank.id}
              value={bank.id} 
              label={bank.name}>
              <div className={style.bankItem}>
                <Image className={style.bankImage} src={bank.image}/>
                <span className={style.bankName}>{bank.name}</span>
              </div>
            </SelectOption>
          ))
        }
      </Select>
      <TextField
        style={style.textField}
        placeholder='Nombre de la cuenta'
        formField={form.fields.name}
        validators={[validators.required]}/>
      <TextField
        style={style.textField}
        placeholder='Número de cuenta'
        formField={form.fields.accountNumber}
        validators={[validators.required]}
        onEnter={handleSave}/>
    </Modal>
  );
}
