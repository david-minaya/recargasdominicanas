import React, { Fragment } from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { expired, formatCurrency, formatRef } from '@recargas-dominicanas/core/utils';
import { DetailModal } from '../detail-modal/detail-modal.component';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';

import { 
  ModalContent,
  OutlineButton, 
  ModalOptions
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  title: string;
  transaction?: ITransaction;
  overlayEnterAnimation?: boolean;
  onPrint: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

export function InvoiceModal(props: Props) {

  const {
    open,
    title,
    transaction,
    overlayEnterAnimation,
    onPrint,
    onCancel,
    onClose
  } = props;

  return (
    <DetailModal
      open={open} 
      title={title}
      overlayEnterAnimation={overlayEnterAnimation}
      onClose={onClose}>
      <ModalContent>
        {transaction &&
          <Fragment>
            <DetailModalItem title='Compañía' text={transaction.product.name}/>
            <DetailModalItem title='No. de contrato' text={transaction.contract!.nic}/>
            <DetailModalItem title='Titular' text={transaction.contract!.name}/>
            <DetailModalItem title='Monto' text={formatCurrency(transaction.amount)} color='green'/>
            <DetailModalItem title='Beneficio' text={formatCurrency(transaction.profit)} color='green'/>
            <DetailModalItem title='Referencia' text={formatRef(transaction.reference!)}/>
            {transaction.cancelled &&
              <DetailModalItem title='Estado' text='Cancelada'/>
            }
          </Fragment>
        }
      </ModalContent>
      <ModalOptions>
        {onPrint &&
          <OutlineButton 
            icon='receipt' 
            text='Imprimir' 
            onClick={onPrint}/>
        }
        {transaction && onCancel && !transaction.cancelled && !expired(transaction) &&
          <OutlineButton 
            icon='cancel' 
            text='Cancelar'
            onClick={onCancel}/>
        }
      </ModalOptions>
    </DetailModal>
  );
}
