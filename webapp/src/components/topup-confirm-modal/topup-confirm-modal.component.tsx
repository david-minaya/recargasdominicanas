import React from 'react';
import { formatCurrency, formatPhone } from '@recargas-dominicanas/core/utils';
import { DetailModal } from '../detail-modal/detail-modal.component';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';

import {
  ModalContent,
  ModalActions, 
  Button, 
  OutlineButton
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  company: string;
  phone: string;
  amount: number;
  overlayEnterAnimation?: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function TopupConfirmModal(props: Props) {

  const {
    open,
    company,
    phone,
    amount,
    overlayEnterAnimation,
    onAccept,
    onClose
  } = props;

  return (
    <DetailModal
      open={open}
      title='Confirmar recarga'
      overlayEnterAnimation={overlayEnterAnimation}>
      <ModalContent>
        <DetailModalItem title='Compañía' text={company}/>
        <DetailModalItem title='Teléfono' text={formatPhone(phone)}/>
        <DetailModalItem title='Monto' text={formatCurrency(amount)} color='green'/>
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Aceptar' onClick={onAccept} />
      </ModalActions>
    </DetailModal>
  );
}
