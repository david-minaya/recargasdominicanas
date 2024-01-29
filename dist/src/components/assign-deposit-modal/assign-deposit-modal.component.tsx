import React, { useState } from 'react';
import { IBusiness, IDeposit } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatId, useForm } from '@recargas-dominicanas/core/utils';
import { BusinessApi, DepositApi } from '@recargas-dominicanas/core/api';
import { useUpdateDeposit } from '../../store/deposits.slice';
import { style } from './assign-deposit-modal.module.css';

import { 
  Autocomplete,
  Button,
  Image,
  Modal, 
  ModalActions, 
  ModalContent, 
  ModalToolbar, 
  OutlineButton, 
  SelectOption,
  Error
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  deposit: IDeposit;
  onClose: () => void;
}

export function AssignDepositModal(props: Props) {

  const { 
    open = true,
    deposit,
    onClose
  } = props;

  if (!open) return null;

  const form = useForm<any>({ business: undefined });
  const [business, setBusiness] = useState<IBusiness[]>();
  const [showError, setShowError] = useState(false);
  const updateDeposit = useUpdateDeposit();

  async function handleSearch(value?: string) {
    setBusiness(await BusinessApi.search(value));
  }

  function handleClose() {
    form.clear();
    setShowError(false);
    onClose();
  }

  async function handleAssign() {


    if (!form.isValid()) return;
    
    try {

      await DepositApi.assign(deposit.id, form.value.business.id);
      updateDeposit({ ...deposit, business: form.value.business });
      handleClose();
    
    } catch (err) {
    
      setShowError(true);
    }
  }

  return (
    <Modal
      open={true}
      style={style.modal}
      onClose={handleClose}>
      <ModalToolbar 
        style={style.toolbar}
        title='Asignar deposito'/>
      <ModalContent>
        <div className={style.bankAccount}>
          <Image 
            className={style.bankAccountImage}
            src={deposit.bankAccount.bank.image}/>
          <div className={style.bankAccountInfo}>
            <div className={style.bankAccountName}>{deposit.bankAccount.name}</div>
            <div className={style.balance}>{formatCurrency(deposit.balance.amount)}</div>
            <div className={style.bankAccountNumber}>{deposit.bankAccount.accountNumber}</div>
          </div>
        </div>
        <Autocomplete
          style={style.autocomplete}
          placeholder='Seleccionar negocio'
          formField={form.fields.business}
          required={true}
          onSearch={handleSearch}>
          {
            business?.map(business => (
              <SelectOption key={business.id} value={business} label={business.name}>
                <div className={style.businessItem}>
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
          message='No se pudo asignar el deposito'/>
      </ModalContent>
      <ModalActions>
        <Button 
          text='Cancelar'
          onClick={handleClose}/>
        <OutlineButton 
          text='Asignar'
          onClick={handleAssign}/>
      </ModalActions>
    </Modal>
  );
}
