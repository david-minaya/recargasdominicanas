import React, { useEffect, useState } from 'react';
import { BankAccountApi } from '@recargas-dominicanas/core/api';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { CellButton } from '@recargas-dominicanas/core/components';
import { IBankAccount } from '@recargas-dominicanas/core/types';
import { ProviderStore } from '../../../store/providerStore';
import { BankAccountItem } from '../../../components/bank-account-item/bank-account-item.component';
import { BankAccountAddModal } from '../../../components/bank-account-add-modal/bank-account-add-modal.component';
import { BankAccountUpdateModal } from '../../../components/bank-account-update-modal/bank-account-update-modal.component';
import { Table } from '@recargas-dominicanas/core/components';
import { style } from './bank-accounts.module.css';

interface Props {
  id: number;
  userId: number;
}

export function BankAccounts(props: Props) {

  const { 
    id,
    userId 
  } = props;

  const bankAccounts = ProviderStore.getBankAccounts(id);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [editBankAccount, setEditBankAccount] = useState<IBankAccount>();

  useEffect(() => {
    ProviderStore.fetchBankAccounts(id);
  }, []);

  function handleOpenUpdateModal(bankAccount: IBankAccount) {
    setOpenUpdateModal(true);
    setEditBankAccount(bankAccount);
  }

  async function handleAddBankAccount(bankAccount: any) {
    await BankAccountApi.add({ userId, ...bankAccount });
    await ProviderStore.fetchBankAccounts(id);
  }

  async function handleUpdateBankAccount(id: number, bankAccount: any) {
    await BankAccountApi.update(id, bankAccount);
    await ProviderStore.fetchBankAccounts(id);
  }

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <span>Banco</span>
          <span>Nombre</span>
          <span>Cuenta</span>
          <span>Balance</span>
          <CellButton
            text='Agregar cuenta'
            onClick={() => setOpenAddModal(true)}/>
        </TableHeader>
        <tbody>
          {bankAccounts?.map(bankAccount =>
            <BankAccountItem 
              key={bankAccount.id} 
              bankAccount={bankAccount}
              onEdit={handleOpenUpdateModal}/>
          )}
        </tbody>
      </Table>
      <BankAccountAddModal
        open={openAddModal}
        onSave={handleAddBankAccount}
        onClose={() => setOpenAddModal(false)}/>
      <BankAccountUpdateModal
        open={openUpdateModal}
        bankAccount={editBankAccount}
        onSave={handleUpdateBankAccount}
        onClose={() => setOpenUpdateModal(false)}/>
    </div>
  );
}
