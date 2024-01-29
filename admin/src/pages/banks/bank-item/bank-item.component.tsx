import React, { Fragment, useRef, useState } from 'react';
import { IBank } from '@recargas-dominicanas/core/types';
import { BankApi } from '@recargas-dominicanas/core/api';
import { Menu } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { MenuOption } from '../../../components/menu-option/menu-option.component';
import { BankAddModal } from '../bank-add-modal/bank-add-modal.component';
import { BankStore } from '../../../store/bankStore';
import { useHistory } from 'react-router-dom';

interface Props {
  bank: IBank;
}

export function BankItem(props: Props) {

  const { bank } = props;

  const history = useHistory();
  const menuIconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  async function handleUpdate(bank: any) {
    await BankApi.update(bank);
    await BankStore.fetchAll();
  }

  return (
    <Fragment>
      <TableRow 
        key={bank.id}
        onClick={() => history.push(`/bank/${bank.id}`)}>
        <CellImage src={bank.image}/>
        <Cell weight='medium' text={bank.name}/>
        <CellIcon refIcon={menuIconRef} onClick={() => setOpenMenu(true)}/>
      </TableRow>
      <Menu 
        open={openMenu} 
        anchor={menuIconRef}
        onClose={() => setOpenMenu(false)}>
        <MenuOption 
          text='Editar' 
          onClick={() => setOpenEditModal(true)}/>
      </Menu>
      <BankAddModal
        open={openEditModal}
        title='Editar banco'
        buttonText='Guardar'
        bank={bank}
        onAccept={handleUpdate}
        onClose={() => setOpenEditModal(false)}/>
    </Fragment>
  );
}
