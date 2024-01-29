import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { useIsAuth } from '@recargas-dominicanas/core/hooks';
import { style } from './login.module.css';

import { 
  Icon, 
  OutlineButton,
  TextField, 
  Title, 
  Error, 
  Brand 
} from '@recargas-dominicanas/core/components';

export function Login() {

  const history = useHistory();
  const form = useForm({ userName: '', password: '' });
  const [isAuth, isLoading] = useIsAuth('businessUser');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {

    setErrorMessage(undefined);

    if (!form.isValid()) return;

    try {

      const { userName, password } = form.value;
      await BusinessUserApi.login(userName, password);
      
      history.push('/');

    } catch (error: any) {

      if (error.response.status === 401) {
        setErrorMessage('Nombre de usuario o contraseña incorrecta');
      } else {
        setErrorMessage('Ocurrio un error al tratar de iniciar sesión');
      }
    }
  }

  if (isLoading) {
    return null;
  }

  if (isAuth) {
    return <Redirect to='/'/>;
  }

  return (
    <div className={style.container}>
      <Brand style={style.brand}/>
      <div className={style.card}>
        <Icon className={style.cardIcon} icon='account_circle'/>
        <Title style={style.cardTitle} title='Iniciar sesión'/>
        <form className={style.form}>
          <TextField
            style={style.emailField} 
            placeholder='Nombre de usuario'
            formField={form.fields.userName}
            validators={[validators.required]}/>
          <TextField
            style={style.passwordField}
            type={showPassword ? 'text' : 'password'}
            placeholder='Contraseña'
            formField={form.fields.password}
            onEnter={handleLogin}
            validators={[
              validators.required,
              validators.length(4, 'La contraseña debe tener al menos 4 caracteres')
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
          text='Iniciar sesión'
          onClick={handleLogin}/>
      </div>
    </div>
  );
}
