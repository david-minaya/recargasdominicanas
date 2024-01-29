import React, { Fragment } from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { Invoice } from '@recargas-dominicanas/core/types';
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
  invoice?: Invoice;
  onAccept: () => void;
  onClose: () => void;
}

export function InvoiceConfirmModal(props: Props) {

  const {
    open,
    company,
    invoice,
    onAccept,
    onClose
  } = props;

  return (
    <DetailModal
      open={open} 
      title='Datos de facturación'
      overlayEnterAnimation={false}>
      <ModalContent>
        {invoice &&
          <Fragment>
            <DetailModalItem title='Compañía' text={company}/>
            <DetailModalItem title='No. de contrato' text={invoice.nic}/>
            <DetailModalItem title='Titular' text={invoice.name}/>
            <DetailModalItem title='Monto' text={formatCurrency(invoice.amount)} color='green'/>
          </Fragment>
        }
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Pagar' onClick={onAccept} />
      </ModalActions>
    </DetailModal>
  );
}
