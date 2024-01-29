import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BankStore } from '../../store/bankStore';
import { OptionButton } from '../../components/option-button/option-button.component';
import { EditBankAccountModal } from './edit-bank-account-modal/edit-bank-account-modal.component';
import { BankAccountItem } from './bank-account-item/bank-account-item.component';
import { BankAccountApi } from '@recargas-dominicanas/core/api';
import { style } from './bank.module.css';

import { 
  OutlineTable, 
  TableHeader,
  OutlineCard,
  ToolbarTitle,
  Title,
  PageContainer,
  PageToolbar,
  PageContent
} from '@recargas-dominicanas/core/components';

export function Bank() {

  const params = useParams<{ id: string }>();
  const bankId = parseInt(params.id);
  const bank = BankStore.getById(bankId);
  const bankAccounts = BankStore.getAccounts(bankId);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    BankStore.fetchAccounts(bankId);
  }, [bankId]);

  async function handleAddBankAccount(name: string, accountNumber: string) {
    await BankAccountApi.add({ bankId, name, accountNumber });
    await BankStore.fetchAccounts(bankId);
  }

  async function handleEditBankAccount(id: number, name: string, accountNumber: string) {
    await BankAccountApi.update(id, { name, accountNumber });
    await BankStore.fetchAccounts(bankId);
  }

  return !bank ? null : (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <ToolbarTitle 
          style={style.title}
          title='Banco'/>
        <div className={style.toolbarRight}>
          <div className={style.bankAccountsTitle}>Cuentas bancarias</div>
          <OptionButton 
            icon='library_add' 
            title='Agregar cuenta bancaria'
            onClick={() => setOpenAddModal(true)}/>
        </div>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineCard className={style.outlineCard}>
          <img 
            className={style.image} 
            src={`${process.env.API}/image/${bank.image}`}/>
          <Title title={bank.name}/>
        </OutlineCard>
        <OutlineTable style={style.table}>
          <TableHeader style={style.tableHeader}>
            <span>Nombre</span>
            <span>Cuenta</span>
            <span></span>
          </TableHeader>
          <tbody>
            {bankAccounts?.map(bankAccount =>
              <BankAccountItem 
                key={bankAccount.id} 
                bankAccount={bankAccount}
                onEdit={handleEditBankAccount}/>
            )}
          </tbody>
        </OutlineTable>
      </PageContent>
      <EditBankAccountModal
        open={openAddModal}
        title='Agregar cuenta bancaria'
        button='Agregar'
        error='Ocurrio un error al agregar la cuenta bancaria'
        onSave={handleAddBankAccount}
        onClose={() => setOpenAddModal(false)}/>
    </PageContainer>
  );
}
