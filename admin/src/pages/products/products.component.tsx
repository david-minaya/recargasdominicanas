import React, { useState } from 'react';
import { Case, Switch, Tab, TabBar } from '@recargas-dominicanas/core/components';
import { PageContainer } from '@recargas-dominicanas/core/components';
import { Topups } from './topups/topups.component';
import { style } from './products.module.css';
import { DataPlans } from './data-plans/data-plans.component';
import { Pins } from './pins/pins.component';
import { Invoices } from './invoices/invoices.component';

export function Products() {

  const [selectedTab, setSelectedTab] = useState('topups');

  function handleTabClick(tab: any) {
    setSelectedTab(tab.tag);
  }

  return (
    <PageContainer className={style.container}>
      <TabBar style={style.tabBar} onTabClick={handleTabClick}>
        <Tab tag='topups' title='Recargas'/>
        <Tab tag='data-plans' title='Planes de datos'/>
        <Tab tag='pins' title='Pines'/>
        <Tab tag='invoices' title='Pago de facturas'/>
      </TabBar>
      <Switch caseId={selectedTab}>
        <Case caseId='topups'><Topups/></Case>
        <Case caseId='data-plans'><DataPlans/></Case>
        <Case caseId='pins'><Pins/></Case>
        <Case caseId='invoices'><Invoices/></Case>
      </Switch>
    </PageContainer>
  );
}
