import React from 'react';
import { formatCurrency, formatPhone } from '@recargas-dominicanas/core/utils';
import { style } from './topup-confirm-modal.module.css';

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
  phone: string;
  amount: number;
  overlayEnterAnimation?: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function TopupConfirmModal(props: Props) {

  const {
    open,
    phone,
    amount,
    overlayEnterAnimation,
    onAccept,
    onClose
  } = props;

  return (
    <BaseModal
      open={open} 
      title='Confirmar'
      overlayEnterAnimation={overlayEnterAnimation}
      style={{ card: style?.card }}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='Teléfono'
          weight='medium'
          text={formatPhone(phone)}/>
        <DetailItem
          style={style.detailItem}
          title='Monto'
          color='green'
          weight='medium'
          text={formatCurrency(amount)}/>
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Aceptar' onClick={onAccept} />
      </ModalActions>
    </BaseModal>
  );
}
