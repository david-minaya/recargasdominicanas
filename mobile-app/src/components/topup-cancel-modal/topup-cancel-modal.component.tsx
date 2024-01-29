import React from 'react';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { style } from './topup-cancel-modal.module.css';

import { 
  BaseModal, 
  ModalContent,
  DetailItem, 
  ModalActions,
  OutlineButton
} from '@recargas-dominicanas/core/components';

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
    <BaseModal
      open={open} 
      title='Cancelar recarga'
      overlayEnterAnimation={overlayEnterAnimation}
      style={{ card: style?.card }}
      onClose={onClose}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='Compañía'
          weight='medium'
          text={transaction.product.name}/>
        <DetailItem
          style={style.detailItem}
          title='Teléfono'
          weight='medium'
          text={transaction.phone}/>
        <DetailItem
          style={style.detailItem}
          title='Monto'
          color='green'
          weight='medium'
          text={formatCurrency(transaction.amount)}/>
        <DetailItem
          style={style.detailItem}
          title='Fecha'
          weight='medium'
          text={formatDate(transaction.date)}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton 
          text='Confirmar' 
          onClick={onAccept}/>
      </ModalActions>
    </BaseModal>
  );
}
