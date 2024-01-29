import React, { useState } from 'react';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { OutlineTable } from '@recargas-dominicanas/core/components';
import { CellButton, TableHeader } from '@recargas-dominicanas/core/components';
import { ProductStore } from '../../../store/productStore';
import { EditPinModal } from '../components/edit-pin-modal/edit-pin-modal.component';
import { PinItem } from '../components/pin-item/pin-item.component';
import { style } from './pins.module.css';

export function Pins() {

  const products = ProductStore.getPins();
  const [openAddModal, setOpenAddModal] = useState(false);

  async function handleAddPin(pin: any) {
    await ProductsApi.addPin(pin);
    await ProductStore.fetchAll();
  }

  return (
    <div className={style.container}>
      <OutlineTable style={style.table}>
        <TableHeader>
          <span>Logo</span>
          <span>Nombre</span>
          <span>Estado</span>
          <span>Instrucciones</span>
          <span>Precios</span>
          <CellButton
            text='Agregar pin'
            onClick={() => setOpenAddModal(true)}/>
        </TableHeader>
        <tbody>
          {
            products?.map(product => 
              <PinItem
                key={product.id} 
                product={product}/>
            )
          }
        </tbody>
      </OutlineTable>
      <EditPinModal
        open={openAddModal}
        title='Agregar pin'
        onAccept={handleAddPin}
        onClose={() => setOpenAddModal(false)}/>
    </div>
  );
}
