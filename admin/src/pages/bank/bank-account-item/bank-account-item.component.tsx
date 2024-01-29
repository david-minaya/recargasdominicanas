import React, { Fragment, useRef, useState } from 'react';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { Menu } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { MenuOption } from '../../../components/menu-option/menu-option.component';
import { TableRow } from '@recargas-dominicanas/core/components';
import { EditBankAccountModal } from '../edit-bank-account-modal/edit-bank-account-modal.component';

interface Props {
  bankAccount: IBankAccount;
  onEdit: (id: number, name: string, accountNumber: string) => Promise<void>;
}

export function BankAccountItem(props: Props) {

  const { 
    bankAccount,
    onEdit
  } = props;

  const menuIconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  function handleOpenEditModal() {
    setOpenEditModal(true);
    setOpenMenu(false);
  }

  async function handleEdit(name: string, accountNumber: string) {
    await onEdit(bankAccount.id, name, accountNumber);
  }

  return (
    <Fragment>
      <TableRow key={bankAccount.id}>
        <Cell text={bankAccount.name}/>
        <Cell text={bankAccount.accountNumber}/>
        <CellIcon refIcon={menuIconRef} onClick={() => setOpenMenu(true)}/>
      </TableRow>
      <Menu 
        open={openMenu} 
        anchor={menuIconRef}
        onClose={() => setOpenMenu(false)}>
        <MenuOption text='Editar' onClick={handleOpenEditModal}/>
      </Menu>
      <EditBankAccountModal
        open={openEditModal}
        title='Editar cuenta bancaria'
        button='Guardar'
        error='Ocurrio un error al editar la cuenta bancaria'
        bankAccount={bankAccount}
        onSave={handleEdit}
        onClose={() => setOpenEditModal(false)}/>
    </Fragment>
  );
}
