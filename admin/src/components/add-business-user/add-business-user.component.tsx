import React, { useState } from 'react';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { useAsyncEffect, useForm, validators } from '@recargas-dominicanas/core/utils';
import { BusinessStore } from '../../store/businessStore';
import { TextField } from '@recargas-dominicanas/core/components';
import { Modal } from '../modal/modal.component';
import { style } from './add-business-user.module.css';
import { IBusinessUser } from '@recargas-dominicanas/core/types';

interface Props {
  open: boolean;
  businessId: number;
  onSaved: (businessUser: IBusinessUser) => void;
  onClose: () => void;
}

export function AddBusinessUser(props: Props) {

  const {
    open,
    businessId,
    onSaved,
    onClose
  } = props;

  const form = useForm({ name: '' });
  const [username, setUsername] = useState<string>();
  const [error, setError] = useState<string>();

  useAsyncEffect(async () => {
    if (open) {
      setUsername(await BusinessUserApi.getNewUserName(businessId));
    }
  }, [open]);

  function handleCancel() {
    form.clear();
    onClose();
    setError(undefined);
  }

  async function handleSave() {
    
    if (!form.isValid()) return;

    try {

      const businessUser = await BusinessUserApi.add(businessId, username!, form.value.name);
      await BusinessStore.fetchBusinessUsers(businessId);
      
      onSaved(businessUser);
      handleCancel();

    } catch (err) {

      setError('Ocurrio un error al crear el usuario');
    }
  }

  if (!open || !username) return null;

  return (
    <Modal
      open={open}
      style={style.modal}
      title='Agregar usuario'
      error={error}
      onClose={handleCancel}
      onPrimaryClick={handleSave}
      onSecondaryClick={handleCancel}>
      <TextField
        style={style.textField}
        label='Nombre'
        placeholder='Nombre'
        formField={form.fields.name}
        validators={[validators.required]}
        onEnter={handleSave}/>
      <div className={style.item}>
        <span className={style.title}>Usuario</span>
        <span className={style.username}>{username}</span>
      </div>
    </Modal>
  );
}
