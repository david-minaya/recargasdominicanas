import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { formatCurrency, formatPhone } from '@recargas-dominicanas/core/utils';
import { PageContainer, Text } from '@recargas-dominicanas/core/components';
import { PageToolbar } from '@recargas-dominicanas/core/components';
import { PageContent } from '@recargas-dominicanas/core/components';
import { Products } from './products/products.component';
import { Deposits } from './deposits/deposits.component';
import { BankAccounts } from './bank-accounts/bank-accounts.component';
import { Configuration } from './configuration/configuration.component';
import { ProviderStore } from '../../store/providerStore';
import { Transactions } from './transactions/transactions.component';
import { Sales } from './sales/sales.component';
import { style } from './provider.module.css';

import { 
  Case, 
  OutlineCard,
  Switch, 
  Tab, 
  TabBar, 
  ToolbarTitle,
  DetailItem
} from '@recargas-dominicanas/core/components';

export function Provider() {

  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const provider = ProviderStore.getById(id);
  const externalBalance = ProviderStore.getExternalBalance(id);
  const [selectedTab, setSelectedTab] = useState('sales');

  useEffect(() => {
    ProviderStore.fetchById(id);
    ProviderStore.fetchTransactions(id, 1, 100);
    ProviderStore.fetchProducts(id);
    ProviderStore.fetchBankAccounts(id);
    ProviderStore.fetchDeposits(id);
    ProviderStore.fetchConfigs(id);
    ProviderStore.fetchExternalBalance(id);
  }, []);

  function handleTabClick(tab: any) {
    setSelectedTab(tab.tag);
  }

  return !provider ? null : (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <ToolbarTitle 
          style={style.title}
          title='Proveedor'/>
        <TabBar onTabClick={handleTabClick}>
          <Tab style={style.tab} tag='sales' title='Ventas'/>
          <Tab style={style.tab} tag='transactions' title='Transacciones'/>
          <Tab style={style.tab} tag='products' title='Productos'/>
          <Tab style={style.tab} tag='deposits' title='Depositos'/>
          <Tab style={style.tab} tag='bank-accounts' title='Cuentas bancarias'/>
          <Tab style={style.tab} tag='configuration' title='Configuración'/>
        </TabBar>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineCard className={style.outlineCard}>
          <img 
            className={style.image} 
            src={`${process.env.API}/static/${provider.image}`}/>
          <Text
            className={style.providerTitle} 
            text={provider.name}/>
          {provider.rnc && <DetailItem style={style.detailItem} title='RNC' text={provider.rnc}/>}
          {provider.phone && <DetailItem style={style.detailItem} title='Teléfono' text={formatPhone(provider.phone)}/>}
          {provider.email && <DetailItem style={style.detailItem} title='Email' text={provider.email}/>}
          <DetailItem 
            title='Estado' 
            text={provider.enabled ? 'Activo' : 'Desactivado'}
            style={provider.enabled ? style.detailItemEnabled : style.detailItemDisabled}/>
          <DetailItem 
            style={style.detailItemBalance} 
            title='Balance'
            text={formatCurrency(externalBalance || 0)}/>
        </OutlineCard>
        <OutlineCard className={style.outlineCardRight}>
          <Switch caseId={selectedTab}>
            <Case caseId='sales'><Sales provider={provider}/></Case>
            <Case caseId='transactions'><Transactions id={provider.id}/></Case>
            <Case caseId='products'><Products id={provider.id}/></Case>
            <Case caseId='deposits'><Deposits id={provider.id}/></Case>
            <Case caseId='bank-accounts'><BankAccounts id={provider.id} userId={provider.user.id}/></Case>
            <Case caseId='configuration'><Configuration providerId={provider.id}/></Case>
          </Switch>
        </OutlineCard>
      </PageContent>
    </PageContainer>
  );
}
