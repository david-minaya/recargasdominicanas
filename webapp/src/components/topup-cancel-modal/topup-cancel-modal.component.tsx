import React from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatDate, formatPhone } from '@recargas-dominicanas/core/utils';
import { ModalContent, ModalActions, OutlineButton } from '@recargas-dominicanas/core/components';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';
import { DetailModal } from '../detail-modal/detail-modal.component';

interface Props {
  open: boolean;
  transaction?: ITransaction;
  overlayEnterAnimation?: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function TopupCancelModal(props: Props) {

  const {
    open,
    transaction,
    overlayEnterAnimation,
    onAccept,
    onClose
  } = props;

  if (!transaction) return null;

  return (
    <DetailModal
      open={open} 
      title='Cancelar recarga'
      overlayEnterAnimation={overlayEnterAnimation}
      onClose={onClose}>
      <ModalContent>
        <DetailModalItem title='Compañía' text={transaction.product.name}/>
        <DetailModalItem title='Teléfono' text={formatPhone(transaction.phone)}/>
        <DetailModalItem title='Monto' text={formatCurrency(transaction.amount)} color='green'/>
        <DetailModalItem title='Fecha' text={formatDate(transaction.date)}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton 
          text='Confirmar' 
          onClick={onAccept}/>
      </ModalActions>
    </DetailModal>
  );
}
