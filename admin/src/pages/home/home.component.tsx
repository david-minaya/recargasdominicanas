import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomerApi } from '@recargas-dominicanas/core/api';
import { Title, Text, OutlineButton } from '@recargas-dominicanas/core/components';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { PageContainer } from '@recargas-dominicanas/core/components';
import { PageToolbar } from '@recargas-dominicanas/core/components';
import { PageContent } from '@recargas-dominicanas/core/components';
import { OutlineTable } from '@recargas-dominicanas/core/components';
import { IBusiness, ICustomer } from '@recargas-dominicanas/core/types';
import { BusinessItem } from '../../components/business-item/business-item.component';
import { EditCustomerModal } from '../../components/edit-customer-modal/edit-customer-modal.component';
import { BusinessStore } from '../../store/businessStore';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';

export function Home() {

  const history = useHistory();
  const business = BusinessStore.getAll();
  const [openModal, setOpenModal] = useState(false);
  const [editCustomerError, setEditCustomerError] = useState<string>();

  useAsyncEffect(async () => {
    await BusinessStore.fetchAll();
  });

  function handleAddButtonClick() {
    setOpenModal(true);
  }

  async function handleSaveCustomer(customer: Partial<ICustomer>, business: Partial<IBusiness>) {

    setEditCustomerError(undefined);

    try {

      const result = await CustomerApi.createCustomer(customer, business);
      history.push('/created-customer', result);

    } catch (err: any) {

      setEditCustomerError('Ocurrio un error al crear el cliente');
    }
  }

  function handleCloseModal() {
    setOpenModal(false);
    setEditCustomerError(undefined);
  }

  return (
    <PageContainer>
      <PageToolbar>
        <Title title='Clientes'/>
        <OutlineButton
          text='Agregar cliente'
          onClick={handleAddButtonClick}/>
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
            <Text text=''/>
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
      <EditCustomerModal 
        open={openModal}
        title='Agregar cliente'
        error={editCustomerError}
        onSave={handleSaveCustomer}
        onClose={handleCloseModal}/>
    </PageContainer>
  );
}
