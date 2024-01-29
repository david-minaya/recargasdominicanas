import React from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { style } from './pin-confirm-modal.module.css';

import { 
  BaseModal, 
  ModalContent,
  DetailItem, 
  ModalActions, 
  Button, 
  OutlineButton 
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  quantity: number;
  price: number;
  onAccept: () => void;
  onClose: () => void;
}

export function PinConfirmModal(props: Props) {

  const {
    open,
    quantity,
    price,
    onAccept,
    onClose
  } = props;

  return (
    <BaseModal
      open={open} 
      title='Confimar pin'
      style={{ card: style?.card }}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='Cantidad'
          weight='medium'
          text={`${quantity}`}/>
        <DetailItem
          style={style.detailItem}
          title='Precio' 
          color='green' 
          weight='medium' 
          text={formatCurrency(price)}/>
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Aceptar' onClick={onAccept} />
      </ModalActions>
    </BaseModal>
  );
}
