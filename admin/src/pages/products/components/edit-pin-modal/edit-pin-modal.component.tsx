import React, { useEffect, useRef, useState } from 'react';
import { IProduct, Price } from '@recargas-dominicanas/core/types';
import { TextField, Text, Icon, FieldError, TextArea } from '@recargas-dominicanas/core/components';
import { useField, formatCurrency, useForm, validators } from '@recargas-dominicanas/core/utils';
import { Modal } from '../../../../components/modal/modal.component';
import { Style, mergeStyle } from './edit-pin-modal.module.css';
import { ImagePicker } from '../../../../components/image-picker/image-picker.component';

interface IForm {
  id?: number;
  name: string;
  instructions: string;
  image?: File;
}

interface Props {
  open: boolean,
  title: string,
  product?: IProduct,
  style?: Style,
  onClose?: () => void,
  onAccept?: (product: any) => Promise<void>
}

export function EditPinModal(props: Props) {

  const {
    open,
    title,
    product,
    style: customStyle,
    onClose,
    onAccept
  } = props;

  const style = mergeStyle(customStyle);
  const addPinRef = useRef<HTMLDivElement>(null);
  const price = useField('');
  const [prices, setPrices] = useState<Price[]>(product?.prices || []);
  const [priceError, setPriceError] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setPrices(product?.prices || []);

    return () => {
      if (!open) clear();
    };
  }, [open, product]);

  const form = useForm<IForm>({
    id: product?.id,
    name: product?.name || '',
    instructions: product?.pin?.instructions || '',
    image: undefined
  });

  function handleAddPrice() {

    const value = parseInt(price.value);
    const exists = prices.some(({ price }) => price === value);
    
    setPriceError(undefined);

    if (isNaN(value) || value <= 0) {
      setPriceError('Precio invalido');
      return;
    }

    if (exists) {
      setPriceError('Precio duplicado');
      return;
    }

    setPrices(prices => [...prices, { price: value } as Price]);
    setTimeout(() => addPinRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60);
    price.clear();
  }

  function handleDeletePrice(price: number) {
    setPrices(prices => prices.filter(_price => _price.price !== price));
  }

  async function handleAccept() {

    if (loading) return;

    const isValid = form.isValid();

    if (prices.length < 1 || !isValid) {
      setPriceError('Requerido');
      return;
    }

    try {

      setError(undefined);
      setLoading(true);

      await onAccept?.({ ...form.value, prices: JSON.stringify(prices) });
      
      setLoading(false);
      handleClose();

    } catch (err: any) {

      setError('Ocurrio un error al guardar el pin');
      setLoading(false);
    }
  }

  function handleClose() {
    clear();
    onClose?.();
  }

  function clear() {
    form.clear();
    setPrices([]);
    setPriceError(undefined);
    setError(undefined);
    setLoading(false);
  }

  return (
    <Modal
      open={open}
      title={title}
      style={style.modal}
      secondaryButton='Guardar'
      error={error}
      onSecondaryClick={handleAccept}
      onClose={handleClose}>
      <div className={style.left}>
        <TextField 
          label='Nombre'
          style={style.textField} 
          placeholder='Nombre'
          formField={form.fields.name}
          validators={[validators.required]}/>
        <ImagePicker
          required={true}
          image={product?.image}
          field={form.fields.image}/>
        <TextArea
          style={style.textArea}
          label='Instrucciones'
          formField={form.fields.instructions}
          placeholder='Descripción'/>
      </div>
      <div>
        <Text className={style.title} text='Precios'/>
        <div className={style.prices}>
          {prices
            .slice()
            .sort((p1, p2) => p1.price - p2.price)
            .map(({ price }) =>
              <div
                className={style.priceItem} 
                key={price}>
                <div className={style.priceItemText}>{formatCurrency(price)}</div>
                <Icon 
                  className={style.priceItemIcon} 
                  icon='clear'
                  onClick={() => handleDeletePrice(price)}/>
              </div> 
            )
          }
          <div 
            className={style.addPin}
            ref={addPinRef}>
            <TextField 
              style={style.addPinInput} 
              type='number'
              placeholder='Agregar precio'
              formField={price}
              onEnter={handleAddPrice}/>
            <Icon 
              className={style.addPinIcon} 
              icon='add'
              onClick={handleAddPrice}/>
          </div>
          {priceError &&
            <div ref={e => e?.scrollIntoView({ behavior: 'smooth', block: 'end' })}>
              <FieldError message={priceError}/>
            </div>
          }
        </div>
      </div>
    </Modal>
  );
}
