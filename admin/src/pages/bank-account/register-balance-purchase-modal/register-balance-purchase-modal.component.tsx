import React, { useEffect, useState } from 'react';
import { BankAccountApi, ProviderApi } from '@recargas-dominicanas/core/api';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { useAsyncEffect, useForm, validators } from '@recargas-dominicanas/core/utils';
import { DateTime, Select, SelectOption, TextField } from '@recargas-dominicanas/core/components';
import { Modal } from '../../../components/modal/modal.component';
import { BankAccountStore } from '../../../store/bankAccountStore';
import { BankAccountSelect } from '../../../components/bank-account-select/bank-account-select.component';
import { Toggle } from '../../../components/toggle/toggle.component';
import { ProviderStore } from '../../../store/providerStore';
import { style } from './register-balance-purchase-modal.module.css';

interface Props {
  open: boolean;
  bankAccountId: number;
  balance: number;
  onClose: () => void;
}

export function RegisterBalancePurchaseModal(props: Props) {

  const {
    open,
    bankAccountId,
    balance,
    onClose
  } = props;

  const form = useForm({
    providerId: undefined as number | undefined,
    bankAccount: undefined as IBankAccount | undefined,
    date: '' as string | undefined,
    balance: '',
    businessId: '',
    description: '',
    brcd: '',
    taxes: ''
  });

  const providers = ProviderStore.getAll();
  const [error, setError] = useState<string>();
  const [disabledTaxesField, setDisabledTaxesField] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);
  const [disabledButton, setDisabledButton] = useState(false);

  useAsyncEffect(async () => {

    if (!open) return;

    form.fields.bankAccount.clear();

    if (form.value.providerId !== undefined) {
      setBankAccounts(await ProviderApi.getBankAccounts(form.value.providerId));
    } else {
      setBankAccounts([]);
    }
  }, [open, form.value.providerId]);

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

      await BankAccountApi.registerBalancePurchase(bankAccountId, {
        providerId: form.value.providerId!,
        bankAccountId: form.value.bankAccount!.id,
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

      setError('Ocurrio un error al registrar la compra de balance');
    }

    setDisabledButton(false);
  }

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Registrar compra de balance'
      error={error}
      secondaryButton='Registrar'
      disabledSecondaryButton={disabledButton}
      onClose={handleCancel}
      onSecondaryClick={handleSave}>
      <Select 
        style={style.select} 
        icon='storefront'
        label='Proveedor'
        placeholder='Seleccionar proveedor'
        required={true}
        formField={form.fields.providerId}>
        {
          providers?.map(provider =>
            <SelectOption
              style={style.selectOption}
              key={provider.id}
              value={provider.id}
              label={provider.name}>
              {provider.name}
            </SelectOption> 
          )
        }
      </Select>
      <BankAccountSelect 
        style={style.textField}
        label='Cuenta bancaria'
        field={form.fields.bankAccount}
        disabled={bankAccounts.length === 0}
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
          on={true}
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
