import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { useAsyncEffect, useForm, validators } from '@recargas-dominicanas/core/utils';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { IBusinessUser } from '@recargas-dominicanas/core/types';

import { 
  Title, 
  Text,
  TextField, 
  OutlineButton,
  Error,
  Icon,
  Brand
} from '@recargas-dominicanas/core/components';

import { style } from './create-password.module.css';

export function CreatePassword() {

  const history = useHistory();
  const form = useForm({ password: '', repeatPassword: '' });
  const [businessUser, setBusinessUser] = useState<IBusinessUser>();
  const [showError, setShowError] = useState(false);
  const { token } = useParams<{ token: string }>();
  const [showPassword, setShowPassword] = useState(false);

  useAsyncEffect(async () => {
    try {
      setBusinessUser(await BusinessUserApi.validateToken(token));
    } catch (err: any) {
      history.push('/page-not-found');
    }
  });

  async function handleSubmit() {

    setShowError(false);

    if (!form.isValid()) return;

    try {
      await BusinessUserApi.createPassword(token, form.value.password);
      history.push('/');
    } catch (err) {
      setShowError(true);
    }
  }

  if (!businessUser) return null;

  return (
    <div className={style.container}>
      <Brand style={style.brand}/>
      <Text
        className={style.title} 
        text={`!Bienvenido a Recargas Dominicanas <span>${businessUser.name}!</span>`}/>
      <Text
        className={style.description} 
        text='Cree una nueva contraseña para iniciar sesion'/>
      <div className={style.card}>
        <Title title='Crear nueva contraseña'/>
        <div className={style.info}>
          <Icon className={style.icon} icon='storefront'/>
          <Text className={style.name} text={businessUser.business.name}/>
          <Text className={style.username} text={businessUser.userName}/>
        </div>
        <TextField 
          style={style.newPassword}
          type={showPassword ? 'text' : 'password'}
          formField={form.fields.password}
          placeholder='Nueva contraseña'
          validators={[
            validators.required,
            validators.length(8, 'La contraseña debe tener al menos 8 caracteres')
          ]}/>
        <TextField 
          style={style.repeatPassword}
          type={showPassword ? 'text' : 'password'}
          formField={form.fields.repeatPassword}
          placeholder='Repetir contraseña'
          validators={[
            validators.required,
            validators.length(8, 'La contraseña debe tener al menos 8 caracteres'),
            validators.equal(form.value.password, 'Las contraseñas deben ser iguales')
          ]}/>
        <label className={style.showPassword}>
          <input
            type='checkbox' 
            checked={showPassword}
            className={style.checkbox}
            onChange={() => setShowPassword(showPassword => !showPassword)}/>
          <div>Mostrar contraseña</div>
        </label>
        <Error
          show={showError} 
          message='Ocurrio un error al crear la contraseña'/>
        <OutlineButton 
          style={style.button} 
          text='Crear contraseña'
          onClick={handleSubmit}/>
      </div>
    </div>
  );
}
