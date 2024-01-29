import React from 'react';
import { formatCurrency, formatRef } from '@recargas-dominicanas/core/utils';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { style } from './invoice-cancel-modal.module.css';

import { 
  BaseModal, 
  ModalContent,
  DetailItem, 
  ModalActions,
  OutlineButton
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  invoice?: ITransaction;
  onAccept: () => void;
  onClose: () => void;
}

export function InvoiceCancelModal(props: Props) {

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
      title='Cancelar factura'
      style={{ card: style?.card }}
      onClose={onClose}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='Compañía'
          weight='medium'
          text={invoice.product.name}/>
        <DetailItem
          style={style.detailItem}
          title='No. de contrato'
          weight='medium'
          text={invoice.contract!.nic}/>
        <DetailItem
          style={style.detailItem}
          title='Titular' 
          weight='medium' 
          text={invoice.contract!.name}/>
        <DetailItem
          style={style.detailItem}
          title='Monto'
          color='green'
          weight='medium'
          text={formatCurrency(invoice.amount)}/>
        <DetailItem
          style={style.detailItem}
          title='Referencia'
          weight='medium'
          text={formatRef(invoice.reference!)}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton 
          text='Confirmar' 
          onClick={onAccept}/>
      </ModalActions>
    </BaseModal>
  );
}
