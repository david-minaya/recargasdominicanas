import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { useIsAuth } from '@recargas-dominicanas/core/hooks';
import { AdminApi } from '@recargas-dominicanas/core/api';
import { useFetchAdmin } from '../../store/admin.slice';

import { 
  Icon, 
  OutlineButton,
  TextField, 
  Title, 
  Error
} from '@recargas-dominicanas/core/components';

import { style } from './login.module.css';

export function Login() {

  const history = useHistory();
  const form = useForm({ email: '', password: '' });
  const [isAuth, isLoading] = useIsAuth();
  const [errorMessage, setErrorMessage] = useState<string>();
  const fetchAdmin = useFetchAdmin();

  async function handleLogin() {

    setErrorMessage(undefined);

    if (!form.isValid()) return;

    try {

      const { email, password } = form.value;
      await AdminApi.login(email, password);
      await fetchAdmin();
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
      <div className={style.header}>
        <img className={style.logo} src='recargas-dominicanas-32x32.svg'/>
        <span className={style.title}>Recargas Dominicanas</span>
      </div>
      <div className={style.card}>
        <Icon className={style.cardIcon} icon='admin_panel_settings'/>
        <Title style={style.cardTitle} title='Iniciar sesión'/>
        <form className={style.form}>
          <TextField
            style={style.emailField} 
            placeholder='Correo electrónico'
            formField={form.fields.email}
            validators={[
              validators.required,
              validators.email
            ]}/>
          <TextField
            style={style.passwordField}
            type='password'
            placeholder='Contraseña'
            formField={form.fields.password}
            onEnter={handleLogin}
            validators={[
              validators.required,
              validators.length(4, 'La contraseña debe tener al menos 4 caracteres')
            ]}/>
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
