import React from 'react';
import { IBank } from '@recargas-dominicanas/core/types';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { Modal } from '../../../components/modal/modal.component';
import { Style, mergeStyle } from './bank-add-modal.module.css';
import { TextField } from '@recargas-dominicanas/core/components';
import { UploadImage } from '../../../components/upload-image/upload-image.component';

interface IForm {
  id?: number,
  name: string,
  image?: File
}

interface Props {
  open: boolean,
  title: string,
  buttonText: string,
  bank?: IBank,
  style?: Style,
  onClose?: () => void,
  onAccept?: (product: any) => void
}

export function BankAddModal(props: Props) {

  const {
    open,
    title,
    buttonText,
    bank,
    style: customStyle,
    onClose,
    onAccept
  } = props;

  if (!open) return null;

  const style = mergeStyle(customStyle);

  const form = useForm<IForm>({
    id: bank?.id,
    name: bank?.name || '',
    image: undefined
  });

  function handleAccept() {
    if (form.isValid()) {
      onAccept?.(form.value);
      handleClose();
    }
  }

  function handleClose() {
    form.clear();
    onClose?.();
  }

  return (
    <Modal
      open={open}
      title={title}
      style={style.modal}
      secondaryButton={buttonText}
      onSecondaryClick={handleAccept}
      onClose={handleClose}>
      <UploadImage 
        required={true}
        image={bank?.image}
        field={form.fields.image}/>
      <div className={style.rightPane}>
        <TextField 
          style={style.textField} 
          placeholder='Nombre'
          formField={form.fields.name}
          validators={[validators.required]}/>
      </div>
    </Modal>
  );
}
