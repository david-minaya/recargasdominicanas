import React, { Fragment, useRef, useState } from 'react';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { Menu } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { MenuOption } from '../menu-option/menu-option.component';
import { TableRow } from '@recargas-dominicanas/core/components';

interface Props {
  bankAccount: IBankAccount;
  onClick?: () => void;
  onEdit?: (bankAccount: IBankAccount) => void;
}

export function BankAccountItem(props: Props) {

  const { 
    bankAccount,
    onClick,
    onEdit
  } = props;

  const menuIconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  function handleEdit() {
    onEdit?.(bankAccount);
    setOpenMenu(false);
  }

  return (
    <Fragment>
      <TableRow 
        key={bankAccount.id}
        onClick={onClick}>
        <CellImage src={bankAccount.bank.image}/>
        <Cell weight='medium' text={bankAccount.name}/>
        <Cell weight='medium' text={bankAccount.accountNumber}/>
        <Cell weight='medium' color='green' text={formatCurrency(bankAccount.balance || 0)}/>
        <CellIcon refIcon={menuIconRef} onClick={() => setOpenMenu(true)}/>
      </TableRow>
      <Menu 
        open={openMenu} 
        anchor={menuIconRef}
        onClose={() => setOpenMenu(false)}>
        <MenuOption text='Editar' onClick={handleEdit}/>
      </Menu>
    </Fragment>
  );
}
