import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApi } from '@recargas-dominicanas/core/api';
import { style } from './settings.module.css';

import { 
  AppToolbar, 
  BaseModal, 
  Button, 
  ModalActions, 
  ModalContent, 
  OutlineButton 
} from '@recargas-dominicanas/core/components';

export function Settings() {

  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  function handleGoBack() {
    history.replace('/');
  }

  async function handleLogout() {
    await AuthApi.logout();
    history.replace('/login');
  }

  return (
    <div className={style.container}>
      <AppToolbar 
        icon='arrow_back' 
        title='Configuración'
        onClick={handleGoBack}/>
      <div className={style.content}>
        <OutlineButton
          style={style.button}
          icon='logout'
          text='Cerrar sesión'
          onClick={() => setOpenModal(true)}/>
      </div>
      <BaseModal
        style={style.modal}
        open={openModal}
        title='Cerrar sesión'
        showCloseOption={false}
        onClose={() => setOpenModal(false)}>
        <ModalContent className={style.modalContent}>
          Esta seguro de querer cerrar sesión
        </ModalContent>
        <ModalActions>
          <Button 
            text='Cancelar'
            onClick={() => setOpenModal(false)}/>
          <OutlineButton 
            text='Aceptar'
            onClick={handleLogout}/>
        </ModalActions>
      </BaseModal>
    </div>
  );
}
