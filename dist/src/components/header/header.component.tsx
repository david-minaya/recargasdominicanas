import React, { Fragment, useRef } from 'react';
import { Icon, Menu, Option } from '@recargas-dominicanas/core/components';
import { style } from './header.module.css';
import { useOpenPopup } from '@recargas-dominicanas/core/hooks';
import { AuthApi } from '@recargas-dominicanas/core/api';
import { useHistory } from 'react-router-dom';

interface Props {
  onClick: () => void;
}

export function Header(props: Props) {

  const { onClick } = props;

  const history = useHistory();
  const menuRef = useRef<HTMLDivElement>(null);
  const openMenu = useOpenPopup();

  async function handleLogout() {
    await AuthApi.logout();
    history.replace('/login');
  }

  return (
    <Fragment>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <img
            className={style.logo} 
            src='recargas-dominicanas-32x32.svg'
            onClick={onClick}/>
          <span 
            className={style.title}>
            Recargas Dominicanas
          </span>
        </div>
        <Icon 
          icon='more_horiz'
          iconRef={menuRef}
          onClick={openMenu.handleOpen}/>
      </div>
      <Menu 
        open={openMenu.open}
        anchor={menuRef}
        onClose={openMenu.handleClose}>
        <Option 
          hiddeIcon 
          text='Cerrar sesion'
          onClick={handleLogout}/>
      </Menu>
    </Fragment>
  );
}
