import React from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { ModalContent, ModalActions, OutlineButton } from '@recargas-dominicanas/core/components';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';
import { DetailModal } from '../detail-modal/detail-modal.component';

interface Props {
  open: boolean;
  transaction: ITransaction;
  overlayEnterAnimation?: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function InvoiceCancelModal(props: Props) {

  const {
    open,
    transaction,
    overlayEnterAnimation,
    onAccept,
    onClose
  } = props;

  return (
    <DetailModal
      open={open} 
      title='Cancelar pago'
      overlayEnterAnimation={overlayEnterAnimation}
      onClose={onClose}>
      <ModalContent>
        <DetailModalItem title='Compañía' text={transaction.product.name}/>
        <DetailModalItem title='No. contrato' text={transaction.contract!.nic}/>
        <DetailModalItem title='Titular' text={transaction.contract!.name}/>
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
