import React, { useState } from 'react';
import { Error, OutlineButton, TextField } from '@recargas-dominicanas/core/components';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { useHistory } from 'react-router-dom';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { style } from './add-business.module.css';
import { CustomerApi } from '@recargas-dominicanas/core/api';

export function AddBusiness() {

  const history = useHistory();
  const [showError, setShowError] = useState(false);
  
  const customer = useForm({
    name: '',
    docNumber: '',
    phone: '',
    email: ''
  });

  const business = useForm({
    name: '',
    rnc: '',
    phone: '',
    email: '',
    city: '',
    address: ''
  });

  function handleClose() {
    customer.clear();
    business.clear();
    history.goBack();
    setShowError(false);
  }

  async function handleSave() {

    const customerIsValid = customer.isValid();
    const businessIsValid = business.isValid();

    if (!customerIsValid || !businessIsValid) return;

    try {
      const result = await CustomerApi.createCustomer(customer.value, business.value);
      history.replace('/added-business', result);
    } catch (err: any) {
      setShowError(true);
    }
  }

  return (
    <div className={style.container}>
      <AppToolbar 
        icon='arrow_back' 
        title='Agregar cliente'
        onClick={handleClose}/>
      <div className={style.content}>
        <div className={style.title}>Datos del cliente</div>
        <TextField 
          style={style.textField}
          placeholder='Nombre'
          formField={customer.fields.name}
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='Cédula'
          formField={customer.fields.docNumber}
          validators={[
            validators.required,
            validators.length(11, 'Cédula invalida')
          ]}/>
        <TextField 
          style={style.textField} 
          placeholder='Teléfono'
          formField={customer.fields.phone}
          validators={[
            validators.required,
            validators.phone
          ]}/>
        <TextField 
          style={style.textField} 
          placeholder='Correo electrónico'
          formField={customer.fields.email}
          validators={[validators.email]}/>
        <div className={style.title}>Datos del negocio</div>
        <TextField 
          style={style.textField} 
          placeholder='Nombre'
          formField={business.fields.name}
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='RNC'
          formField={business.fields.rnc}/>
        <TextField 
          style={style.textField} 
          placeholder='Teléfono'
          formField={business.fields.phone} 
          validators={[
            validators.required,
            validators.phone
          ]}/>
        <TextField 
          style={style.textField} 
          placeholder='Correo electrónico'
          formField={business.fields.email}
          validators={[validators.email]}/>
        <TextField 
          style={style.textField} 
          placeholder='Ciudad'
          formField={business.fields.city}
          validators={[validators.required]}/>
        <TextField 
          style={style.textField} 
          placeholder='Dirección'
          formField={business.fields.address} 
          validators={[validators.required]}/>
        <Error
          style={style.error}
          show={showError} 
          message='Ocurrio un error al guardar el cliente'/>
        <OutlineButton
          style={style.button} 
          text='Guardar'
          onClick={handleSave}/>
      </div>
    </div>
  );
}
