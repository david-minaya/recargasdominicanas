import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BusinessStore } from '../../store/businessStore';
import { CustomerCard } from '../../components/customer-card/customer-card.component';
import { Deposits } from '../../components/deposits/deposits.component';
import { SalesReports } from '../../components/sales-reports/sales-reports.component';
import { Transactions } from '../../components/transactions/transactions.component';
import { style } from './business.module.css';

import { 
  Case,
  OutlineCard,
  PageContainer, 
  PageContent, 
  PageToolbar,
  Switch, 
  Tab, 
  TabBar, 
  ToolbarTitle 
} from '@recargas-dominicanas/core/components';

export function Business() {

  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const business = BusinessStore.getById(id);
  const [selectedTab, setSelectedTab] = useState('transactions');

  useEffect(() => {
    BusinessStore.fetchTransactions(id, { page: 1, size: 100 });
    BusinessStore.fetchDeposits(id);
    BusinessStore.fetchSalesReports(id);
  }, []);

  function handleTabClick(tab: any) {
    setSelectedTab(tab.tag);
  }

  if (!business) return null;

  return (
    <PageContainer className={style.container}>
      <PageToolbar>
        <ToolbarTitle 
          style={style.toolbarTitle}
          title={business.name}/>
        <div className={style.toolbarRight}>
          <TabBar onTabClick={handleTabClick}>
            <Tab style={style.tab} tag='transactions' title='Transacciones'/>
            <Tab style={style.tab} tag='sales-reports' title='Cierre de ventas'/>
            <Tab style={style.tab} tag='deposits' title='Depositos'/>
          </TabBar>
        </div>
      </PageToolbar>
      <PageContent className={style.content}>
        <CustomerCard
          style={style.customerCard}
          customer={business.customer} 
          business={business}/>
        <OutlineCard className={style.outlineCard}>
          <Switch caseId={selectedTab}>
            <Case caseId='transactions'><Transactions id={business.id}/></Case>
            <Case caseId='sales-reports'><SalesReports id={business.id}/></Case>
            <Case caseId='deposits'><Deposits id={business.id}/></Case>
          </Switch>
        </OutlineCard>
      </PageContent>
    </PageContainer>
  );
}
