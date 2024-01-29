import React from 'react';
import { formatCurrency, formatRef } from '@recargas-dominicanas/core/utils';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { style } from './invoice-successful-modal.module.css';

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
  onClose: () => void;
}

export function InvoiceSuccessfulModal(props: Props) {

  const {
    open,
    transaction,
    onClose
  } = props;

  if (!transaction) return null;

  return (
    <BaseModal
      open={open} 
      title='Pago realizado'
      overlayEnterAnimation={false}
      style={{ card: style?.card }}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='No. de contrato'
          weight='medium'
          text={transaction.contract!.nic}/>
        <DetailItem
          style={style.detailItem}
          title='Titular' 
          weight='medium' 
          text={transaction.contract!.name}/>
        <DetailItem
          style={style.detailItem}
          title='Monto'
          color='green'
          weight='medium'
          text={formatCurrency(transaction.amount)}/>
        <DetailItem
          style={style.detailItem}
          title='Referencia'
          weight='medium'
          text={formatRef(transaction.reference!)}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton 
          text='Aceptar' 
          onClick={onClose} />
      </ModalActions>
    </BaseModal>
  );
}
