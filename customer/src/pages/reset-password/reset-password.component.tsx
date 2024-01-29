import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useForm, validator, validators } from '@recargas-dominicanas/core/utils';
import { CustomerStore } from '../../store/customerStore';
import { CustomerApi } from '../../api/customer.api';

import { 
  Icon, 
  OutlineButton,
  TextField, 
  Title, 
  Error,
  Brand
} from '@recargas-dominicanas/core/components';

import { style } from './reset-password.module.css';

export function ResetPassword() {

  const history = useHistory();
  const customer = CustomerStore.get();
  const form = useForm({ password: '', repeatPassword: '' });
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {

    setErrorMessage(undefined);

    if (!form.isValid()) return;

    try {

      await CustomerApi.resetPassword(form.value.password);
      
      history.push('/');

    } catch (error: any) {

      setErrorMessage('Ocurrio un error al cambiar la contraseña');
    }
  }

  function validatePassword() {
    return validator({
      message: 'La contraseña debe contener letras y números',
      validate: (value: string) => /\d+/.test(value) && /[a-zA-Z]+/.test(value),
    });
  }

  if (!customer || !customer.tempPassword) {
    return <Redirect to='/'/>;
  }

  return (
    <div className={style.container}>
      <Brand style={style.brand}/>
      <div className={style.card}>
        <Icon className={style.cardIcon} icon='admin_panel_settings'/>
        <Title style={style.cardTitle} title='Nueva contraseña'/>
        <form className={style.form}>
          <TextField
            style={style.passwordField}
            type={showPassword ? 'text' : 'password'}
            placeholder='Nueva contraseña'
            formField={form.fields.password}
            onEnter={handleLogin}
            validators={[
              validators.required,
              validators.length(6, 'La contraseña debe tener al menos 6 caracteres'),
              validatePassword()
            ]}/>
          <TextField
            style={style.passwordField}
            type={showPassword ? 'text' : 'password'}
            placeholder='Repetir contraseña'
            formField={form.fields.repeatPassword}
            onEnter={handleLogin}
            validators={[
              validators.required,
              validators.length(6, 'La contraseña debe tener al menos 6 caracteres'),
              validators.equal(form.value.password, 'Las contraseñas deben ser iguales'),
              validatePassword()
            ]}/>
          <label className={style.showPassword}>
            <input
              type='checkbox' 
              checked={showPassword}
              className={style.checkbox}
              onChange={() => setShowPassword(showPassword => !showPassword)}/>
            <div>Mostrar contraseña</div>
          </label>
        </form>
        <Error 
          show={errorMessage !== undefined}
          message={errorMessage!}/>
        <OutlineButton
          style={style.button}
          text='Cambiar contraseña'
          onClick={handleLogin}/>
      </div>
    </div>
  );
}
