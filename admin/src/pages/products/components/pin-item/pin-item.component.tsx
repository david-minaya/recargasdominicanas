import React, { Fragment, useRef, useState } from 'react';
import { IProduct } from '@recargas-dominicanas/core/types';
import { ProductsApi } from '@recargas-dominicanas/core/api';
import { BaseCell, Menu } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { CellIcon } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { ProductStore } from '../../../../store/productStore';
import { MenuOption } from '../../../../components/menu-option/menu-option.component';
import { EditPinModal } from '../edit-pin-modal/edit-pin-modal.component';
import { Style, mergeStyle } from './pin-item.module.css';

interface Props {
  product: IProduct;
  style?: Style;
}

export function PinItem(props: Props) {

  const {
    product,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const iconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  
  async function handleEdit(pin: any) {
    await ProductsApi.updatePin(pin);
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
        {product.enabled 
          ? <Cell weight='medium' color='green' text='Activado'/>
          : <Cell weight='medium' color='gray' text='Desactivado'/>
        }
        <Cell className={style.instructions} text={product.pin?.instructions}/>
        <BaseCell>
          {product.prices
            .slice()
            .sort((p1, p2) => p1.price - p2.price)
            .map(({ price }) =>
              <span className={style.price} key={price}>{price}</span>
            )
          }
        </BaseCell>
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
      </Menu>
      <EditPinModal
        open={openEditModal}
        title='Editar pin'
        product={product}
        onAccept={handleEdit}
        onClose={() => setOpenEditModal(false)}/>
    </Fragment>
  );
}
