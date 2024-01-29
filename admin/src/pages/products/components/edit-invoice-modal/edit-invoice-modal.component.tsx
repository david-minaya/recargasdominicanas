import React from 'react';
import { IProduct } from '@recargas-dominicanas/core/types';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { TextField } from '@recargas-dominicanas/core/components';
import { Modal } from '../../../../components/modal/modal.component';
import { UploadImage } from '../../../../components/upload-image/upload-image.component';
import { Style, mergeStyle } from './edit-invoice-modal.module.css';

interface IForm {
  id?: number,
  type: 'Factura',
  name: string,
  profit: string,
  image?: File
}

interface Props {
  open: boolean,
  title: string,
  invoice?: IProduct,
  style?: Style,
  onClose?: () => void,
  onAccept?: (product: IForm) => void
}

export function EditInvoiceModal(props: Props) {

  const {
    open,
    title,
    invoice,
    style: customStyle,
    onClose,
    onAccept
  } = props;

  if (!open) return null;

  const style = mergeStyle(customStyle);

  const form = useForm<IForm>({
    id: invoice?.id,
    type: 'Factura',
    name: invoice?.name || '',
    profit: invoice?.profit.toString() || '',
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
      secondaryButton='Guardar'
      onSecondaryClick={handleAccept}
      onClose={handleClose}>
      <UploadImage 
        required={true}
        image={invoice?.image}
        field={form.fields.image}/>
      <div className={style.rightPane}>
        <TextField 
          style={style.textField} 
          placeholder='Nombre'
          formField={form.fields.name}
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='Beneficio'
          type='number'
          formField={form.fields.profit}
          validators={[validators.required]}/>
      </div>
    </Modal>
  );
}
