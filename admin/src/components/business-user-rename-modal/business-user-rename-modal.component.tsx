import React, { useState } from 'react';
import { TextField } from '@recargas-dominicanas/core/components';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { IBusinessUser } from '@recargas-dominicanas/core/types';
import { BusinessStore } from '../../store/businessStore';
import { Modal } from '../modal/modal.component';
import { style } from './business-user-rename-modal.module.css';

interface Props {
  open: boolean;
  businessId: number;
  businessUser: IBusinessUser;
  onClose: () => void;
}

export function BusinessUserRenameModal(props: Props) {

  const {
    open,
    businessId,
    businessUser,
    onClose
  } = props;

  const form = useForm({ name: businessUser.name });
  const [error, setError] = useState<string>();

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleRename() {
    
    if (!form.isValid()) return;

    if (form.value.name === businessUser.name) {
      handleCancel();
      return;
    }

    try {

      await BusinessUserApi.rename(businessUser.id, form.value.name);
      await BusinessStore.fetchBusinessUsers(businessId);

      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al renombrar el usuario');
    }
  }

  if (!open) return null;

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Renombrar usuario'
      error={error}
      primaryButton='Renombrar'
      onClose={handleCancel}
      onPrimaryClick={handleRename}
      onSecondaryClick={handleCancel}>
      <TextField
        style={style.textField}
        label='Nombre'
        autofocus={true}
        formField={form.fields.name}
        validators={[validators.required]}
        onEnter={handleRename}/>
      <div className={style.item}>
        <span className={style.title}>Usuario</span>
        <span className={style.username}>{businessUser.userName}</span>
      </div>
    </Modal>
  );
}
