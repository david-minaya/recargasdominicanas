import React from 'react';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { Text, TextField } from '@recargas-dominicanas/core/components';
import { IBusiness, ICustomer } from '@recargas-dominicanas/core/types';
import { Modal } from '../modal/modal.component';
import { style } from './edit-customer-modal.module.css';

interface Props { 
  open: boolean;
  title: string;
  error?: string;
  business?: IBusiness;
  onSave: (customer: Partial<ICustomer>, business: Partial<IBusiness>) => Promise<void>;
  onClose: () => void;
}

export function EditCustomerModal(props: Props) {

  const {
    open = false,
    title,
    error,
    business,
    onSave,
    onClose
  } = props;

  const customerForm = useForm({
    name: business?.customer.name || '',
    docNumber: business?.customer.docNumber || '',
    phone: business?.customer.phone || '',
    email: business?.customer.email || ''
  });

  const businessForm = useForm({
    name: business?.name || '',
    rnc: business?.rnc || '',
    phone: business?.phone || '',
    email: business?.email || '',
    city: business?.city || '',
    address: business?.address || '',
    percent: business?.percent || '' as any
  });

  function handleClose() {
    customerForm.clear();
    businessForm.clear();
    onClose();
  }

  async function handleSave() {

    const customerIsValid = customerForm.isValid();
    const businessIsValid = businessForm.isValid();

    if (!customerIsValid || !businessIsValid) return;

    await onSave(customerForm.value, businessForm.value);
  }

  return (
    <Modal
      open={open}
      icon='person_add'
      title={title}
      primaryButton='Guardar'
      error={error}
      style={style.modal}
      onPrimaryClick={handleSave}
      onClose={handleClose}
      onSecondaryClick={handleClose}>
      <Text 
        className={style.customerTitle} 
        text='Datos del cliente'/>
      <div className={style.fieldsContent}>
        <TextField 
          style={style.textField} 
          placeholder='Nombre'
          formField={customerForm.fields.name} 
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='Cédula'
          formField={customerForm.fields.docNumber} 
          validators={[
            validators.required,
            validators.length(11, 'Cédula invalida')
          ]}/>
        <TextField 
          style={style.textField} 
          placeholder='Teléfono'
          formField={customerForm.fields.phone}
          validators={[
            validators.required,
            validators.phone
          ]}/>
        <TextField 
          style={style.textField} 
          placeholder='Correo electrónico'
          formField={customerForm.fields.email}
          validators={[
            validators.email
          ]}/> 
      </div>
      <Text 
        className={style.businessTitle} 
        text='Datos del Negocio'/>
      <div className={style.fieldsContent}>
        <TextField 
          style={style.textField} 
          placeholder='Nombre'
          formField={businessForm.fields.name} 
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='RNC'
          formField={businessForm.fields.rnc}/>
        <TextField 
          style={style.textField} 
          placeholder='Teléfono'
          formField={businessForm.fields.phone} 
          validators={[
            validators.required,
            validators.phone
          ]}/>
        <TextField 
          style={style.textField} 
          placeholder='Correo electrónico'
          formField={businessForm.fields.email}
          validators={[validators.email]}/> 
        <TextField 
          style={style.textField} 
          placeholder='Ciudad'
          formField={businessForm.fields.city}
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='Dirección'
          formField={businessForm.fields.address} 
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='Porcentaje'
          formField={businessForm.fields.percent} 
          validators={[validators.required]}
          type='number'/>
      </div>
    </Modal>
  );
}
