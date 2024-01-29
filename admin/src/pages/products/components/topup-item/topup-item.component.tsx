import React, { Fragment, useRef, useState } from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { IProduct } from '@recargas-dominicanas/core/types';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { Menu } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { ProductStore } from '../../../../store/productStore';
import { MenuOption } from '../../../../components/menu-option/menu-option.component';
import { EditProductModal } from '../edit-product-modal/edit-product-modal.component';
import { Style, mergeStyle } from './topup-item.module.css';

interface Props {
  product: IProduct,
  style?: Style
}

export function TopupItem(props: Props) {

  const {
    product,
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
    await ProductsApi.enable(product.id, !product.enabled);
    await ProductStore.fetchAll();
  }
  
  return (
    <Fragment>
      <TableRow>
        <CellImage src={product.image}/>
        <Cell weight='medium' text={product.name}/>
        <Cell weight='medium' color='green' text={formatCurrency(product.min)}/>
        <Cell weight='medium' color='green' text={formatCurrency(product.max)}/>
        {product.enabled 
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
          text={product.enabled ? 'Desactivar' : 'Activar'} 
          onClick={handleEnableDisable}/>
        <MenuOption 
          style={style.deleteOption} 
          text='Archivar'/>
      </Menu>
      <EditProductModal
        open={openEditModal}
        title='Editar Recarga'
        buttonText='Guardar'
        product={product}
        onAccept={handleEdit}
        onClose={() => setOpenEditModal(false)}/>
    </Fragment>
  );
}
