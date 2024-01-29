import React, { useRef, useState, MouseEvent, Fragment } from 'react';
import { IBusinessUser } from '@recargas-dominicanas/core/types';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { TableRow } from '@recargas-dominicanas/core/components';
import { Menu } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { BusinessUserModal } from '../business-user-modal/business-user-modal.componet';
import { BusinessUserConfirmModal } from '../business-user-confirm-modal/business-user-confirm-modal.component';
import { BusinessUserRenameModal } from '../business-user-rename-modal/business-user-rename-modal.component';
import { BusinessStore } from '../../store/businessStore';
import { MenuOption } from '../menu-option/menu-option.component';
import { Style, mergeStyle } from './business-user-item.module.css';

interface Props {
  businessId: number;
  businessUser: IBusinessUser;
  style?: Style;
}

export function BusinessUserItem(props: Props) {

  const {
    businessId,
    businessUser,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const iconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [openResetedPasswordModal, setOpenResetedPasswordModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  function handleOpenMenu(event?: MouseEvent<HTMLElement>) {
    setOpenMenu(state => !state);
    event?.stopPropagation();
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  async function handleResetPassword() {
    
    await BusinessUserApi.resetPassword(businessUser.id);
    await BusinessStore.fetchBusinessUsers(businessId);

    setOpenResetedPasswordModal(true);
  }

  async function handleEnable() {
    await BusinessUserApi.enable(businessUser.id);
    await BusinessStore.fetchBusinessUsers(businessId);
  }

  async function handleDisable() {
    await BusinessUserApi.disable(businessUser.id);
    await BusinessStore.fetchBusinessUsers(businessId);
  }

  async function handleDelete() {
    await BusinessUserApi.delete(businessUser.id);
    await BusinessStore.fetchBusinessUsers(businessId);
  }

  return (
    <Fragment>
      <TableRow 
        key={businessUser.id} 
        style={style.tableRow}
        onClick={() => setOpenModal(true)}>
        <Cell text={businessUser.name}/>
        <Cell weight='medium' text={businessUser.userName}/>
        {businessUser.state === 'ACTIVATED' && 
          <Cell weight='medium' color='green' text='Activado'/>
        }
        {businessUser.state === 'NOT_ACTIVATED' && 
          <Cell weight='medium' color='darkgray' text='No Activado'/>
        }
        {businessUser.state === 'DISABLED' && 
          <Cell weight='medium' color='gray' text='Desativado'/>
        }
        <CellIcon refIcon={iconRef} onClick={handleOpenMenu}/>
      </TableRow>
      <Menu 
        open={openMenu}
        anchor={iconRef}
        style={style.menu}
        top={8}
        onClose={handleCloseMenu}>
        <MenuOption
          text='Cambiar nombre'
          onClick={() => setOpenRenameModal(true)}/>
        {businessUser?.state === 'ACTIVATED' &&
          <MenuOption
            text='Resetear contraseña'
            onClick={() => setOpenResetPasswordModal(true)}/>
        }
        {businessUser?.state === 'DISABLED' &&
          <MenuOption
            text='Activar'
            onClick={handleEnable}/>
        }
        {businessUser?.state === 'ACTIVATED' &&
          <MenuOption
            text='Desactivar'
            onClick={handleDisable}/>
        }
        <MenuOption
          style={style.deleteMenuOption}
          text='Eliminar'
          onClick={() => setOpenDeleteModal(true)}/>
      </Menu>
      <BusinessUserModal
        open={openModal}
        title='Usuario'
        businessUser={businessUser}
        onClose={() => setOpenModal(false)}/>
      <BusinessUserModal
        open={openResetedPasswordModal}
        title='Contraseña reseteada'
        businessUser={businessUser}
        onClose={() => setOpenResetedPasswordModal(false)}/>
      <BusinessUserConfirmModal
        open={openDeleteModal}
        title='Eliminar usuario'
        description='Eliminar usuario'
        businessUser={businessUser}
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteModal(false)}/>
      <BusinessUserConfirmModal
        open={openResetPasswordModal}
        title='Resetear contraseña'
        description='Resetear la contraseña del usuario'
        businessUser={businessUser}
        onConfirm={handleResetPassword}
        onClose={() => setOpenResetPasswordModal(false)}/>
      <BusinessUserRenameModal
        open={openRenameModal}
        businessId={businessId}
        businessUser={businessUser}
        onClose={() => setOpenRenameModal(false)}/>
    </Fragment>
  );
}
