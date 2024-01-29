import React from 'react';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { OutlineTable } from '@recargas-dominicanas/core/components';
import { PageContainer } from '@recargas-dominicanas/core/components';
import { PageContent } from '@recargas-dominicanas/core/components';
import { PageToolbar } from '@recargas-dominicanas/core/components';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { Title } from '@recargas-dominicanas/core/components';
import { ProviderItem } from '../../components/provider-item/provider-item.component';
import { ProviderStore } from '../../store/providerStore';
import { style } from './providers.module.css';

export function Providers() {

  const providers = ProviderStore.getAll();

  useAsyncEffect(async () => {
    await ProviderStore.fetchAll();
  });
  
  return (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <Title
          style={style.title} 
          title='Proveedores'/>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineTable>
          <TableHeader style={style.tableHeader}>
            <span>Logo</span>
            <span>Nombre</span>
            <span>Balance</span>
            <span>Venta</span>
            <span>Beneficio</span>
            <span>Estado</span>
            <span></span>
          </TableHeader>
          <tbody>
            {providers?.map(provider => 
              <ProviderItem
                key={provider.id}
                provider={provider}/>
            )}
          </tbody>
        </OutlineTable>
      </PageContent>
    </PageContainer>
  );
}
