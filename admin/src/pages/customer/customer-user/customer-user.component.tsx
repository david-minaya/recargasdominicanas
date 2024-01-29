import React, { useRef, useState, MouseEvent } from 'react';
import { Cell, CellIcon, Menu, TableRow } from '@recargas-dominicanas/core/components';
import { ICustomer } from '@recargas-dominicanas/core/types';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { MenuOption } from '../../../components/menu-option/menu-option.component';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal.component';
import { style } from './customer-user.module.css';
import { CustomerApi } from '@recargas-dominicanas/core/api';
import { BusinessStore } from '../../../store/businessStore';
import { formatDate } from '@recargas-dominicanas/core/utils';

interface Props {
  businessId: number;
  customer: ICustomer;
}

export function CustomerUser(props: Props) {

  const {
    businessId,
    customer
  } = props;

  const tempPassword = customer.user.tempPassword;
  const iconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  function handleOpenMenu(event?: MouseEvent<HTMLElement>) {
    setOpenMenu(state => !state);
    event?.stopPropagation();
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }

  async function handleResetPassword() {
    await CustomerApi.resetPassword(customer.id);
    await BusinessStore.fetchById(businessId);
  }

  function isExpired() {
    return Date.now() > new Date(tempPassword!.expirationDate).getTime();
  }

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <span>Usuario</span>
          <span>{customer.user.tempPassword ? 'Contraseña temporal' : 'Contraseña'}</span>
          {customer.user.tempPassword && <span>Fecha de expiración</span>}
          <span></span>
        </TableHeader>
        <tbody>
          <TableRow>
            <Cell weight='medium' color='darkgray' text={customer.docNumber}/>
            {!tempPassword &&
              <Cell weight='bold' color='darkgray' text='* * * * * * * * * *'/>
            }
            {tempPassword &&
              <Cell 
                weight='medium' 
                color='darkgray' 
                text={!isExpired() ? tempPassword?.password : '* * * * * * * * * * * * *'}/>
            }
            {tempPassword &&
              <Cell 
                text={`${formatDate(tempPassword?.expirationDate)} ${(isExpired() ? '(Expirada)' : '')}`}/>
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
              text='Resetear contraseña'
              onClick={() => setOpenConfirmModal(true)}/>
          </Menu>
        </tbody>
      </Table>
      <ConfirmModal
        style={style.modal}
        open={openConfirmModal}
        title='Resetear contraseña'
        description='Sí, estoy seguro.'
        onConfirm={handleResetPassword}
        onClose={() => setOpenConfirmModal(false)}>
        Esta seguro de querer resetear esta contraseña.
      </ConfirmModal>
    </div>
  );
}
