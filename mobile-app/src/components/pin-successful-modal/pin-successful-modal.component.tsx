import React from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { style } from './pin-successful-modal.module.css';

import { 
  BaseModal, 
  ModalContent,
  DetailItem, 
  ModalActions,
  OutlineButton 
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  price: number;
  quantity: number;
  onClose: () => void;
}

export function PinSuccessfulModal(props: Props) {

  const {
    open,
    price,
    quantity,
    onClose
  } = props;

  return (
    <BaseModal
      open={open} 
      title='Operacion exitosa'
      onClose={onClose}
      showCloseOption={false}
      overlayEnterAnimation={false}
      style={{ card: style?.card }}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='Pines vendidos'
          weight='medium'
          text={`${quantity}`}/>
        <DetailItem
          style={style.detailItem}
          title='Precio' 
          color='green' 
          weight='medium' 
          text={formatCurrency(price)}/>
        {quantity > 1 &&
          <DetailItem
            style={style.detailItem}
            title='Total' 
            color='green' 
            weight='medium' 
            text={formatCurrency(price * quantity)}/>
        }
      </ModalContent>
      <ModalActions>
        <OutlineButton text='Aceptar' onClick={onClose} />
      </ModalActions>
    </BaseModal>
  );
}
