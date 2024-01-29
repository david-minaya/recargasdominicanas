import React, { useState } from 'react';
import { BankAccountApi } from '@recargas-dominicanas/core/api';
import { DateTime, TextField } from '@recargas-dominicanas/core/components';
import { formatCurrency, useForm, validators } from '@recargas-dominicanas/core/utils';
import { BankAccountStore } from '../../../store/bankAccountStore';
import { Modal } from '../../../components/modal/modal.component';
import { style } from './register-profit-withdrawal-modal.module.css';
import { FinanceStore } from '../../../store/financeStore';

interface Props {
  open: boolean;
  bankAccountId: number;
  balance: number;
  onClose: () => void;
}

export function RegisterProfitWithdrawalModal(props: Props) {

  const {
    open,
    bankAccountId,
    balance,
    onClose
  } = props;

  const [error, setError] = useState<string>();
  const [disabledButton, setDisabledButton] = useState(false);
  
  const summary = FinanceStore.getSummary();

  const form = useForm({
    date: '' as string | undefined,
    balance: '',
    description: ''
  });

  async function handleSave() {
    
    if (!form.isValid()) return;

    setDisabledButton(true);

    try {

      await BankAccountApi.registerProfitWithdrawal(bankAccountId, {
        balance: parseInt(form.value.balance),
        date: new Date(form.value.date!),
        description: form.value.description
      });

      FinanceStore.fetch();
      BankAccountStore.fetchById(bankAccountId);
      BankAccountStore.fetchWithdrawals(bankAccountId, 1, 100);

      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al registrar el retiro');
    }

    setDisabledButton(false);
  }

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  function balanceValidator() {
    return {
      deps: balance,
      message: `No posee fondos suficientes: ${formatCurrency(balance)}`,
      validate: (value: string) => parseInt(value) <= balance
    };
  }

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Registrar retiro de beneficio'
      error={error}
      secondaryButton='Registrar'
      disabledSecondaryButton={disabledButton}
      onClose={handleCancel}
      onSecondaryClick={handleSave}>
      <div className={style.profit}>
        <div className={style.profitTitle}>Beneficio</div>
        <div className={style.profitValue}>{formatCurrency(summary?.generalProfit || 0)}</div>
      </div>
      <TextField
        style={style.textField}
        label='Balance'
        type='number'
        formField={form.fields.balance}
        validators={[
          validators.required,
          validators.max(summary?.generalProfit || 0),
          balanceValidator()
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
