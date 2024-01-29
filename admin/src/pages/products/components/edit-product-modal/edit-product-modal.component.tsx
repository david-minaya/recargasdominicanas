import React from 'react';
import { IProduct } from '@recargas-dominicanas/core/types';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { Modal } from '../../../../components/modal/modal.component';
import { UploadImage } from '../../../../components/upload-image/upload-image.component';
import { Style, mergeStyle } from './edit-product-modal.module.css';

import { 
  Select, 
  SelectOption, 
  TextField 
} from '@recargas-dominicanas/core/components';

interface IForm {
  id?: number,
  name: string,
  type?: string,
  profit: string,
  min: string,
  max: string,
  image?: File
}

interface Props {
  open: boolean,
  title: string,
  buttonText: string,
  product?: IProduct,
  style?: Style,
  onClose?: () => void,
  onAccept?: (product: any) => void
}

export function EditProductModal(props: Props) {

  const {
    open,
    title,
    buttonText,
    product,
    style: customStyle,
    onClose,
    onAccept
  } = props;

  if (!open) return null;

  const style = mergeStyle(customStyle);

  const form = useForm<IForm>({
    id: product?.id,
    name: product?.name || '',
    type: product?.type,
    profit: product?.profit.toString() || '',
    min: product?.min.toString() || '',
    max: product?.max.toString() || '',
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
        image={product?.image}
        field={form.fields.image}/>
      <div className={style.rightPane}>
        <TextField 
          style={style.textField} 
          placeholder='Nombre'
          formField={form.fields.name}
          validators={[validators.required]}/>
        <Select 
          style={style.select} 
          placeholder={'Tipo'}
          required={true}
          formField={form.fields.type}>
          <SelectOption
            style={style.selectOption}
            value='Recarga' 
            label='Recarga'>
            Recarga
          </SelectOption>
          <SelectOption 
            style={style.selectOption}
            value='Paquetico' 
            label='Paquetico'>
            Paquetico
          </SelectOption>
        </Select>
        <TextField 
          style={style.textField} 
          placeholder='Porcentaje'
          type='number'
          formField={form.fields.profit}
          validators={[validators.required]}/>
        <div className={style.inputContainer}>
          <TextField 
            style={style.inlineTextField} 
            placeholder='Mínimo'
            type='number'
            formField={form.fields.min}
            validators={[validators.required]}/>
          <TextField 
            style={style.inlineTextField} 
            placeholder='Máximo'
            type='number'
            formField={form.fields.max}
            validators={[validators.required]}
            onEnter={handleAccept}/>
        </div>
      </div>
    </Modal>
  );
}
