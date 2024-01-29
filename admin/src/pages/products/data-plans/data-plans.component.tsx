import React, { useState } from 'react';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { OutlineTable } from '@recargas-dominicanas/core/components';
import { CellButton, TableHeader } from '@recargas-dominicanas/core/components';
import { EditProductModal } from '../components/edit-product-modal/edit-product-modal.component';
import { DataPlanItem } from '../components/data-plan-item/data-plan-item.component';
import { ProductStore } from '../../../store/productStore';
import { style } from './data-plans.module.css';

export function DataPlans() {

  const products = ProductStore.getDataPlans();
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
          <span>Estado</span>
          <CellButton
            text='Agregar plan de datos'
            onClick={() => setOpenAddModal(true)}/>
        </TableHeader>
        <tbody>
          {
            products?.map(product => 
              <DataPlanItem
                key={product.id} 
                product={product}/>
            )
          }
        </tbody>
      </OutlineTable>
      <EditProductModal
        open={openAddModal}
        title='Agregar plan de datos'
        buttonText='Agregar'
        onAccept={handleAddProduct}
        onClose={() => setOpenAddModal(false)}/>
    </div>
  );
}
