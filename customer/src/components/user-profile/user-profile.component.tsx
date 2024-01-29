import React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApi } from '@recargas-dominicanas/core/api';
import { ICustomer } from '@recargas-dominicanas/core/types';
import { Text, Title, OutlineButton } from '@recargas-dominicanas/core/components';
import { style } from './user-profile.module.css';
import { resetStore } from '../../store/store';

interface Props {
  open: boolean;
  customer: ICustomer;
  onClose: () => void;
}

export function UserProfile(props: Props) {

  const {
    open,
    customer,
    onClose
  } = props;

  const history = useHistory();

  async function handleLogout() {
    await AuthApi.logout();
    resetStore();
    history.push('/login');
  }

  return !open ? null : (
    <div 
      className={style.container}
      tabIndex={0}
      ref={e => e?.focus()}
      onBlur={onClose}>
      <Title title={customer.name}/>
      <Text className={style.docNumber} text={customer.docNumber}/>
      <OutlineButton
        style={style.logoutButton} 
        icon='logout' 
        text='Cerrar sesión'
        onClick={handleLogout}/>
    </div>
  );
}
