import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { IBusiness, ICustomer } from '@recargas-dominicanas/core/types';
import { BusinessApi, CustomerApi } from '@recargas-dominicanas/core/api';
import { BusinessStore } from '../../store/businessStore';
import { CustomerCard } from '../../components/customer-card/customer-card.component';
import { Deposits } from '../../components/deposits/deposits.component';
import { BusinessUsers } from '../../components/business-users/business-users.component';
import { SalesReports } from '../../components/sales-reports/sales-reports.component';
import { TabsPane } from '../../components/tabs-pane/tabs-pane.component';
import { EditCustomerModal } from '../../components/edit-customer-modal/edit-customer-modal.component';
import { BusinessTransactions } from './business-transactions/business-transactions.component';
import { CustomerUser } from './customer-user/customer-user.component';
import { style } from './customer.module.css';

import { 
  Case, 
  Icon,
  PageContainer, 
  PageContent, 
  PageToolbar, 
  SalesReport, 
  Switch, 
  Tab, 
  TabBar, 
  ToolbarTitle 
} from '@recargas-dominicanas/core/components';

export function Customer() {

  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const business = BusinessStore.getById(id);
  const deposits = BusinessStore.getDeposits(id);
  const salesReports = BusinessStore.getSalesReports(id);
  const [selectedTab, setSelectedTab] = useState('transactions');
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [editCustomerError, setEditCustomerError] = useState<string>();

  useAsyncEffect(async () => {

    if (!business) {
      await BusinessStore.fetchById(id);
    }

    await BusinessStore.fetchTransactions(id, 1, 100);
    await BusinessStore.fetchDeposits(id);
    await BusinessStore.fetchSalesReports(id);
    await BusinessStore.fetchBusinessUsers(id);
  });

  function handleTabClick(tab: any) {
    setSelectedTab(tab.tag);
  }

  function handleOpenEditCustomer() {
    setOpenEditCustomer(true);
  }

  function handleCloseEditCustomer() {
    setOpenEditCustomer(false);
    setEditCustomerError(undefined);
  }

  async function handleEditCustomer(customerData: Partial<ICustomer>, businessData: Partial<IBusiness>) {

    setEditCustomerError(undefined);

    try {

      await CustomerApi.update(business!.customer.id, customerData);
      await BusinessApi.update(business!.id, businessData);
      await BusinessStore.fetchById(id);
      
      handleCloseEditCustomer();
    
    } catch (err: any) {

      setEditCustomerError('Ocurrio un error al actualizar los datos del cliente');
    }
  }

  if (!business) return null;

  return (
    <PageContainer className={style.container}>
      <PageToolbar>
        <ToolbarTitle 
          style={style.toolbarTitle}
          title={business.name}/>
        <div className={style.toolbarRight}>
          <SalesReport
            style={style.salesReport} 
            balance={business.balance}
            sales={business.sales}
            profit={business.profit}/>
          <div className={style.options}>
            <Icon 
              className={style.option} 
              icon='edit'
              onClick={handleOpenEditCustomer}/>
          </div>
        </div>
      </PageToolbar>
      <PageContent className={style.content}>
        <CustomerCard
          style={style.customerCard}
          customer={business.customer} 
          business={business}/>
        <TabsPane>
          <TabBar onTabClick={handleTabClick}>
            <Tab tag='transactions' title='Transacciones'/>
            <Tab tag='deposits' title='Depositos'/>
            <Tab tag='sales-reports' title='Cierre de ventas'/>
            <Tab tag='users' title='Usuarios'/>
            <Tab tag='customer' title='Cliente'/>
          </TabBar>
          <Switch caseId={selectedTab}>
            <Case caseId='transactions'><BusinessTransactions id={business.id}/></Case>
            <Case caseId='deposits'><Deposits deposits={deposits}/></Case>
            <Case caseId='sales-reports'><SalesReports salesReports={salesReports}/></Case>
            <Case caseId='users'><BusinessUsers businessId={business.id}/></Case>
            <Case caseId='customer'><CustomerUser businessId={business.id} customer={business.customer}/></Case>
          </Switch>
        </TabsPane>
      </PageContent>
      <EditCustomerModal 
        open={openEditCustomer}
        title='Editar cliente'
        error={editCustomerError}
        business={business}
        onSave={handleEditCustomer}
        onClose={handleCloseEditCustomer}/>
    </PageContainer>
  );
}
