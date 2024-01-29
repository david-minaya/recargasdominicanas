import React from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { Invoice } from '@recargas-dominicanas/core/types';
import { style } from './invoice-modal.module.css';

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
  invoice?: Invoice;
  onAccept: () => void;
  onClose: () => void;
}

export function InvoiceModal(props: Props) {

  const {
    open,
    invoice,
    onAccept,
    onClose
  } = props;

  if (!invoice) return null;

  return (
    <BaseModal
      open={open} 
      title='Datos de facturación'
      overlayEnterAnimation={false}
      style={{ card: style?.card }}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='No. de contrato'
          weight='medium'
          text={invoice.nic}/>
        <DetailItem
          style={style.detailItem}
          title='Titular' 
          weight='medium' 
          text={invoice.name}/>
        <DetailItem
          style={style.detailItem}
          title='Monto'
          color='green'
          weight='medium'
          text={formatCurrency(invoice.amount)}/>
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Pagar' onClick={onAccept} />
      </ModalActions>
    </BaseModal>
  );
}
