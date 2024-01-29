import React, { useEffect, useState } from 'react';
import { ProviderProductApi } from '@recargas-dominicanas/core/api';
import { AddProductModal } from './add-product-modal/add-product-modal.component';
import { ProductItem } from './product-item/product-item.component';
import { ProviderStore } from '../../../store/providerStore';
import { style } from './products.module.css';

import { 
  OutlineButton, 
  Text,
  Table,
  TableHeader 
} from '@recargas-dominicanas/core/components';

interface Props {
  id: number;
}

export function Products(props: Props) {

  const { id } = props;

  const [openAddModal, setOpenAddModal] = useState(false);
  const products = ProviderStore.getProducts(id);

  useEffect(() => {
    ProviderStore.fetchProducts(id);
  }, []);

  async function handleAddProduct(providerProduct: any) {
    await ProviderProductApi.add({ id, ...providerProduct });
    await ProviderStore.fetchProducts(id);
  }

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <Text text='Logo'/>
          <Text text='Nombre'/>
          <Text text='Tipo'/>
          <Text text='Beneficio'/>
          <Text text='Clave'/>
          <Text text='Estado'/>
          <OutlineButton 
            style={style.addButton} 
            text='Agregar producto'
            onClick={() => setOpenAddModal(true)}/>
        </TableHeader>
        <tbody>
          {
            products?.map(product => (
              <ProductItem
                key={product.id} 
                providerId={id}
                providerProduct={product}/>
            ))
          }
        </tbody>
      </Table>
      <AddProductModal
        open={openAddModal}
        title='Agregar producto'
        buttonText='Agregar'
        errorMessage='Ocurrio un error al agregar el producto'
        onSave={handleAddProduct}
        onClose={() => setOpenAddModal(false)}/>
    </div>
  );
}
