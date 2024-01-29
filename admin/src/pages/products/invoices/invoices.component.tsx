import React, { useState } from 'react';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { OutlineTable } from '@recargas-dominicanas/core/components';
import { CellButton, TableHeader } from '@recargas-dominicanas/core/components';
import { ProductStore } from '../../../store/productStore';
import { InvoiceItem } from '../components/invoice-item/invoice-item.component';
import { EditInvoiceModal } from '../components/edit-invoice-modal/edit-invoice-modal.component';
import { style } from './invoices.module.css';

export function Invoices() {

  const invoices = ProductStore.getInvoices();
  const [openAddModal, setOpenAddModal] = useState(false);

  async function handleAddInvoice(product: any) {
    await ProductsApi.add(product);
    await ProductStore.fetchAll();
  }

  return (
    <div className={style.container}>
      <OutlineTable style={style.table}>
        <TableHeader>
          <span>Logo</span>
          <span>Nombre</span>
          <span>Beneficio</span>
          <span>Estado</span>
          <CellButton
            text='Agregar'
            onClick={() => setOpenAddModal(true)}/>
        </TableHeader>
        <tbody>
          {
            invoices?.map(invoice =>
              <InvoiceItem
                key={invoice.id} 
                invoice={invoice}/>
            )
          }
        </tbody>
      </OutlineTable>
      <EditInvoiceModal
        open={openAddModal}
        title='Agregar'
        onAccept={handleAddInvoice}
        onClose={() => setOpenAddModal(false)}/>
    </div>
  );
}
