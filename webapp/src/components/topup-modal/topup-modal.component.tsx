import React, { Fragment } from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { expired, formatCurrency, formatDate, formatPhone, formatRef } from '@recargas-dominicanas/core/utils';
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
  onPrint?: ()=> void;
  onCancel?: () => void;
  onClose: () => void;
}

export function TopupModal(props: Props) {

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
            <DetailModalItem title='Teléfono' text={formatPhone(transaction.phone)}/>
            <DetailModalItem title='Monto' text={formatCurrency(transaction.amount)} color='green'/>
            <DetailModalItem title='Beneficio' text={formatCurrency(transaction.profit)} color='green'/>
            <DetailModalItem title='Fecha' text={formatDate(transaction.date)}/>
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
