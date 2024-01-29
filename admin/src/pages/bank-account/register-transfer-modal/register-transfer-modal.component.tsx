import React, { useEffect, useState } from 'react';
import { BankAccountApi } from '@recargas-dominicanas/core/api';
import { DateTime, TextField } from '@recargas-dominicanas/core/components';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { BankAccountStore } from '../../../store/bankAccountStore';
import { Modal } from '../../../components/modal/modal.component';
import { BankAccountSelect } from '../../../components/bank-account-select/bank-account-select.component';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { Toggle } from '../../../components/toggle/toggle.component';
import { style } from './register-transfer-modal.module.css';

interface Props {
  open: boolean;
  bankAccountId: number;
  balance: number;
  onClose: () => void;
}

export function RegisterTransferModal(props: Props) {

  const {
    open,
    bankAccountId,
    balance,
    onClose
  } = props;

  const [error, setError] = useState<string>();
  const [disabledTaxesField, setDisabledTaxesField] = useState(true);
  const [disabledButton, setDisabledButton] = useState(false);
  const bankAccounts = BankAccountStore.getAll().filter(bankAccount => bankAccount.id !== bankAccountId);

  const form = useForm({
    bankAccount: undefined as IBankAccount | undefined,
    date: '' as string | undefined,
    balance: '',
    businessId: '',
    description: '',
    brcd: '',
    taxes: ''
  });

  useEffect(() => {
    if (form.value.balance) {
      const taxes = (parseInt(form.value.balance) / 100) * 0.15;
      form.fields.taxes.update(taxes.toString());
    } else {
      form.fields.taxes.update('');
    }
  }, [form.value.balance]);

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleSave() {
    
    if (!form.isValid()) return;

    setDisabledButton(true);

    try {

      await BankAccountApi.registerTransfer(bankAccountId, {
        destinationBankAccountId: form.value.bankAccount!.id,
        balance: parseInt(form.value.balance),
        date: new Date(form.value.date!),
        description: form.value.description,
        taxes: !disabledTaxesField ? parseFloat(form.value.taxes) : undefined,
        brcd: form.value.brcd ? parseFloat(form.value.brcd) : undefined
      });

      BankAccountStore.fetchById(bankAccountId);
      BankAccountStore.fetchWithdrawals(bankAccountId, 1, 100);

      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al registrar la transferencia');
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
      <div className={style.taxesField}>
        <TextField
          style={style.taxesTextField}
          label='Impuestos'
          formField={form.fields.taxes}
          disabled={disabledTaxesField}/>
        <Toggle 
          className={style.toggle}
          onChange={on => setDisabledTaxesField(!on)}/>
      </div>
      <TextField
        style={style.textField}
        label='BRCD (Transferencia al instante)'
        formField={form.fields.brcd}/>
    </Modal>
  );
}
