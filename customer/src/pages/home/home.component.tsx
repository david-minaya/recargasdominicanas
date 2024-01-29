import React, { useEffect } from 'react';
import { BusinessItem } from '../../components/business-item/business-item.component';
import { BusinessStore } from '../../store/businessStore';

import { 
  Title, 
  Text, 
  TableHeader, 
  PageContainer, 
  PageToolbar, 
  PageContent, 
  OutlineTable 
} from '@recargas-dominicanas/core/components';

export function Home() {

  const business = BusinessStore.getAll();

  useEffect(() => {
    BusinessStore.fetchAll();
  }, []);

  return (
    <PageContainer>
      <PageToolbar>
        <Title title='Negocios'/>
      </PageToolbar>
      <PageContent>
        <OutlineTable>
          <TableHeader>
            <Text text='ID'/>
            <Text text='Negocio'/>
            <Text text='Propietario'/>
            <Text text='Ciudad'/>
            <Text text='Balance'/>
            <Text text='Venta'/>
            <Text text='Beneficio'/>
          </TableHeader>
          <tbody>
            {
              business?.map(business => (
                <BusinessItem 
                  key={business.id}
                  business={business}/>
              ))
            }
          </tbody>
        </OutlineTable>
      </PageContent>
    </PageContainer>
  );
}
