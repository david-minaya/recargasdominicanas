import React, { Fragment, useRef, useState } from 'react';
import { IProduct } from '@recargas-dominicanas/core/types';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { Menu } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { ProductStore } from '../../../../store/productStore';
import { MenuOption } from '../../../../components/menu-option/menu-option.component';
import { EditInvoiceModal } from '../edit-invoice-modal/edit-invoice-modal.component';
import { Style, mergeStyle } from './invoice-item.module.css';
import { formatCurrency } from '@recargas-dominicanas/core/utils';

interface Props {
  invoice: IProduct,
  style?: Style
}

export function InvoiceItem(props: Props) {

  const {
    invoice,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const iconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  
  async function handleEdit(product: any) {
    await ProductsApi.update(product);
    await ProductStore.fetchAll();
  }

  async function handleEnableDisable() {
    await ProductsApi.enable(invoice.id, !invoice.enabled);
    await ProductStore.fetchAll();
  }
  
  return (
    <Fragment>
      <TableRow>
        <CellImage src={invoice.image}/>
        <Cell weight='medium' text={invoice.name}/>
        <Cell weight='medium' color='green' text={formatCurrency(invoice.profit)}/>
        {invoice.enabled 
          ? <Cell weight='medium' color='green' text='Activado'/>
          : <Cell weight='medium' color='gray' text='Desactivado'/>
        }
        <CellIcon refIcon={iconRef} onClick={() => setOpenMenu(true)}/>
      </TableRow>
      <Menu 
        open={openMenu} 
        anchor={iconRef}
        style={style.menu}
        onClose={() => setOpenMenu(false)}>
        <MenuOption 
          text='Editar' 
          onClick={() => setOpenEditModal(true)}/>
        <MenuOption 
          text={invoice.enabled ? 'Desactivar' : 'Activar'} 
          onClick={handleEnableDisable}/>
        <MenuOption 
          style={style.deleteOption} 
          text='Archivar'/>
      </Menu>
      <EditInvoiceModal
        open={openEditModal}
        title='Editar'
        invoice={invoice}
        onAccept={handleEdit}
        onClose={() => setOpenEditModal(false)}/>
    </Fragment>
  );
}
