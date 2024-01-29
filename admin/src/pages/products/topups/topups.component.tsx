import React, { useState } from 'react';
import { CellButton, TableHeader } from '@recargas-dominicanas/core/components';
import { EditProductModal } from '../components/edit-product-modal/edit-product-modal.component';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { TopupItem } from '../components/topup-item/topup-item.component';
import { OutlineTable } from '@recargas-dominicanas/core/components';
import { ProductStore } from '../../../store/productStore';
import { style } from './topups.module.css';

export function Topups() {

  const products = ProductStore.getTopups();
  const [openAddModal, setOpenAddModal] = useState(false);

  async function handleAddProduct(product: any) {
    await ProductsApi.add(product);
    await ProductStore.fetchAll();
  }

  return (
    <div className={style.container}>
      <OutlineTable style={style.table}>
        <TableHeader>
          <span>Logo</span>
          <span>Nombre</span>
          <span>Mínimo</span>
          <span>Máximo</span>
          <span>Estado</span>
          <CellButton
            text='Agregar producto'
            onClick={() => setOpenAddModal(true)}/>
        </TableHeader>
        <tbody>
          {
            products?.map(product => 
              <TopupItem
                key={product.id} 
                product={product}/>
            )
          }
        </tbody>
      </OutlineTable>
      <EditProductModal
        open={openAddModal}
        title='Agregar producto'
        buttonText='Agregar'
        onAccept={handleAddProduct}
        onClose={() => setOpenAddModal(false)}/>
    </div>
  );
}
