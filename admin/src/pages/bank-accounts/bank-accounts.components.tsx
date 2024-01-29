import React, { useEffect } from 'react';
import { BankAccountStore } from '../../store/bankAccountStore';
import { BankAccountItem } from '../../components/bank-account-item/bank-account-item.component';
import { OptionButton } from '../../components/option-button/option-button.component';
import { useHistory } from 'react-router-dom';
import { style } from './bank-accounts.module.css';

import { 
  PageContainer, 
  PageToolbar, 
  Title,
  Text, 
  PageContent, 
  OutlineTable, 
  TableHeader 
} from '@recargas-dominicanas/core/components';

export function BankAccounts() {

  const history = useHistory();
  const bankAccounts = BankAccountStore.getAll();

  useEffect(() => {
    BankAccountStore.fetchAll();
  }, []);

  return (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <Title
          style={style.title}
          title='Cuentas bancarias'/>
        <OptionButton 
          icon='account_balance' 
          title='Bancos'
          rightIcon='chevron_right'
          onClick={() => history.push('/banks')}/>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineTable>
          <TableHeader style={style.tableHeader}>
            <Text text='Banco'/>
            <Text text='Nombre'/>
            <Text text='Cuenta'/>
            <Text text='balance'/>
            <Text text=''/>
          </TableHeader>
          <tbody>
            {
              bankAccounts.map(bankAccount =>
                <BankAccountItem 
                  key={bankAccount.id} 
                  bankAccount={bankAccount}
                  onClick={() => history.push(`/bank-account/${bankAccount.id}`)}/>  
              )
            }
          </tbody>
        </OutlineTable>
      </PageContent>
    </PageContainer>
  );
}
