import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApi } from '@recargas-dominicanas/core/api';
import { IAdmin } from '@recargas-dominicanas/core/types';
import { Title, Text, OutlineButton } from '@recargas-dominicanas/core/components';
import { style } from './user-profile.module.css';

interface Props {
  open: boolean;
  admin: IAdmin;
  onClose: () => void;
}

export function UserProfile(props: Props) {

  const {
    open,
    admin,
    onClose
  } = props;

  const history = useHistory();

  async function handleLogout() {
    await AuthApi.logout();
    history.push('/login');
  }

  return !open ? null : (
    <div 
      className={style.container}
      tabIndex={0}
      ref={e => e?.focus()}
      onBlur={onClose}>
      <Title title={admin.name}/>
      <Text className={style.role} text='Administrador'/>
      <Text className={style.email} text={admin.email}/>
      <OutlineButton
        style={style.logoutButton} 
        icon='logout' 
        text='Cerrar sesión'
        onClick={handleLogout}/>
    </div>
  );
}
