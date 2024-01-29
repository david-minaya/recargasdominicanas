import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { AuthApi } from '@recargas-dominicanas/core/api';
import { formatId } from '@recargas-dominicanas/core/utils';
import { IBusiness, IBusinessUser } from '@recargas-dominicanas/core/types';
import { Title, Text, OutlineButton, OutlineItem } from '@recargas-dominicanas/core/components';
import { style } from './user-profile.module.css';

interface Props {
  open: boolean;
  user: IBusinessUser;
  business: IBusiness;
  onClose: () => void;
}

export function UserProfile(props: Props) {

  const {
    open,
    user,
    business,
    onClose
  } = props;

  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
    }
  }, [open]);

  async function handleLogout() {
    await AuthApi.logout();
    history.push('/login');
  }

  return (
    <CSSTransition
      in={open}
      unmountOnExit={true}
      classNames={style.animation}
      timeout={180}
      nodeRef={ref}>
      <div 
        className={style.container} 
        tabIndex={0} 
        onBlur={onClose}
        ref={ref}>
        <Title title={business.name}/>
        <Text className={style.name} text={user.name}/>
        <Text className={style.account} text={user.userName}/>
        <OutlineItem 
          style={style.idItem}
          text={`ID: ${formatId(business.id)}`}
          icon='copy'/>
        <OutlineButton
          style={style.logoutButton} 
          icon='logout' 
          text='Cerrar sesión'
          onMouseDown={handleLogout}/>
      </div>
    </CSSTransition>
  );
}
