import React, { useState } from 'react';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { IProduct, IProviderProduct } from '@recargas-dominicanas/core/types';
import { Autocomplete, SelectOption, TextField, Image } from '@recargas-dominicanas/core/components';
import { Modal } from '../../../../components/modal/modal.component';
import { style } from './add-product-modal.module.css';

interface IForm {
  id?: number;
  product?: IProduct;
  profit: string;
  key: string;
}

interface Props {
  open: boolean;
  title: string;
  buttonText: string;
  errorMessage: string;
  providerProduct?: IProviderProduct;
  onSave: (providerProduct: any) => Promise<void>;
  onClose: () => void;
}

export function AddProductModal(props: Props) {

  const {
    open,
    title,
    buttonText,
    errorMessage,
    providerProduct,
    onSave,
    onClose
  } = props;

  const [products, setProducts] = useState<IProduct[]>();
  const [error, setError] = useState<string>();
  
  const form = useForm<IForm>({
    product: providerProduct?.product,
    profit: providerProduct?.profit.toString() || '',
    key: providerProduct?.key || ''
  });

  async function handleSearch(name?: string) {
    setProducts(await ProductsApi.getProdutcs({ name }));
  }

  async function handleSave() {

    if (!form.isValid()) return;

    setError(undefined);

    try {

      await onSave({
        productId: form.value.product?.id,
        profit: form.value.profit,
        key: form.value.key
      });

      handleClose();

    } catch (err) {

      setError(errorMessage);
    }
  }

  function handleClose() {
    form.clear();
    setError(undefined);
    onClose();
  }

  return (
    <Modal
      open={open}
      title={title}
      style={style.modal}
      secondaryButton={buttonText}
      error={error}
      onClose={handleClose}
      onSecondaryClick={handleSave}>
      <Autocomplete
        style={style.autocomplete}
        placeholder='Seleccionar producto'
        formField={form.fields.product}
        required={true}
        onSearch={handleSearch}>
        {
          products?.map(product => (
            <SelectOption key={product.id} value={product} label={product.name}>
              <div className={style.productItem}>
                <Image className={style.productItemImage} src={product.image}/>
                <div className={style.productItemInfo}>
                  <span className={style.productItemName}>{product.name}</span>
                  <span className={style.productItemType}>{product.type}</span>
                </div>
              </div>
            </SelectOption>
          ))
        }
      </Autocomplete>
      {form.value.product &&
        <div className={style.productItemSelected}>
          <Image className={style.productItemImage} src={form.value.product.image}/>
          <div className={style.productItemInfo}>
            <span className={style.productItemName}>{form.value.product.name}</span>
            <span className={style.productItemType}>{form.value.product.type}</span>
          </div>
        </div>
      }
      <TextField 
        style={style.textField}
        placeholder='Beneficio'
        type='number'
        formField={form.fields.profit}
        validators={[validators.required]}/>
      <TextField 
        style={style.textField}
        placeholder='Clave'
        formField={form.fields.key}
        validators={[validators.required]}
        onEnter={handleSave}/>
    </Modal>
  );
}
