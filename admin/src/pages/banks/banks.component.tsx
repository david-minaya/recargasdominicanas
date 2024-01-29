import React, { useEffect, useState } from 'react';
import { BankStore } from '../../store/bankStore';
import { BankApi } from '@recargas-dominicanas/core/api';
import { BankItem } from './bank-item/bank-item.component';
import { BankAddModal } from './bank-add-modal/bank-add-modal.component';
import { OptionButton } from '../../components/option-button/option-button.component';
import { style } from './banks.module.css';

import { 
  PageContainer, 
  PageToolbar, 
  Text, 
  PageContent, 
  OutlineTable, 
  TableHeader, 
  ToolbarTitle
} from '@recargas-dominicanas/core/components';


export function Banks() {

  const banks = BankStore.getAll();
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    BankStore.fetchAll();
  }, []);

  async function handleAddBank(bank: any) {
    await BankApi.add(bank);
    await BankStore.fetchAll();
  }

  return (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <ToolbarTitle 
          style={style.title} 
          title='Bancos'/>
        <OptionButton 
          icon='account_balance' 
          title='Agregar banco'
          onClick={() => setOpenAddModal(true)}/>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineTable>
          <TableHeader>
            <Text text='Logo'/>
            <Text text='Nombre'/>
            <Text text=''/>
          </TableHeader>
          <tbody>
            {
              banks.map(bank =>
                <BankItem
                  key={bank.id} 
                  bank={bank}/>  
              )
            }
          </tbody>
        </OutlineTable>
      </PageContent>
      <BankAddModal
        open={openAddModal}
        title='Agregar banco'
        buttonText='Agregar'
        onAccept={handleAddBank}
        onClose={() => setOpenAddModal(false)}/>
    </PageContainer>
  );
}
