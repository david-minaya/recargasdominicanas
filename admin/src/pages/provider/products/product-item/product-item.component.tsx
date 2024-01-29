import React, { Fragment, useRef, useState } from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { IProviderProduct } from '@recargas-dominicanas/core/types';
import { ProviderProductApi } from '@recargas-dominicanas/core/api';
import { Cell } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { Menu, Image } from '@recargas-dominicanas/core/components';
import { ProviderStore } from '../../../../store/providerStore';
import { AddProductModal } from '../add-product-modal/add-product-modal.component';
import { MenuOption } from '../../../../components/menu-option/menu-option.component';
import { ConfirmModal } from '../../../../components/confirm-modal/confirm-modal.component';
import { style } from './product-item.module.css';

interface Props {
  providerId: number;
  providerProduct: IProviderProduct;
}

export function ProductItem(props: Props) {

  const {
    providerId,
    providerProduct
  } = props;

  const menuIconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  async function handleSave(data: any) {
    await ProviderProductApi.update(providerProduct.id, data);
    await ProviderStore.fetchProducts(providerId);
  }

  async function handleDelete() {
    await ProviderProductApi.delete(providerProduct.id);
    await ProviderStore.fetchProducts(providerId);
  }

  async function handleEnabled() {
    await ProviderProductApi.update(providerProduct.id, { enabled: !providerProduct.enabled });
    await ProviderStore.fetchProducts(providerId);
  }

  return (
    <Fragment>
      <TableRow key={providerProduct.id} style={style.tableRow}>
        <CellImage src={providerProduct.product.image}/>
        <Cell weight='medium' text={providerProduct.product.name}/>
        <Cell weight='medium' color='darkgray' text={providerProduct.product.type}/>
        <Cell 
          weight='bold' 
          color='green' 
          text={
            providerProduct.product.type === 'Factura'
              ? formatCurrency(providerProduct.profit)
              : providerProduct.profit + '%'
          }/>
        <Cell text={providerProduct.key}/>
        {providerProduct.enabled 
          ? <Cell weight='medium' color='green' text='Activado'/>
          : <Cell weight='medium' color='gray' text='Desactivado'/>
        }
        <CellIcon refIcon={menuIconRef} onClick={() => setOpenMenu(true)}/>
      </TableRow>
      <Menu 
        open={openMenu} 
        anchor={menuIconRef}
        onClose={() => setOpenMenu(false)}>
        <MenuOption 
          text={providerProduct.enabled ? 'Desactivar' : 'Activar'} 
          onClick={handleEnabled}/>
        <MenuOption 
          text='Editar' 
          onClick={() => setOpenEditModal(true)}/>
        <MenuOption 
          text='Eliminar'
          style={style.deleteOption} 
          onClick={() => setOpenConfirmModal(true)}/>
      </Menu>
      <AddProductModal
        open={openEditModal}
        title='Editar producto'
        buttonText='Guardar'
        errorMessage='Ocurrio un error al actualizar el producto'
        providerProduct={providerProduct}
        onSave={handleSave}
        onClose={() => setOpenEditModal(false)}/>
      <ConfirmModal
        open={openConfirmModal}
        title='Eliminar producto'
        description='Eliminar producto'
        onConfirm={handleDelete}
        onClose={() => setOpenConfirmModal(false)}>
        <div className={style.productItem}>
          <Image className={style.productItemImage} src={providerProduct.product.image}/>
          <div className={style.productItemInfo}>
            <span className={style.productItemName}>{providerProduct.product.name}</span>
            <span className={style.productItemType}>{providerProduct.product.type}</span>
          </div>
        </div>
      </ConfirmModal>
    </Fragment>
  );
}
