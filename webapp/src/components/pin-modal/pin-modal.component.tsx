import React, { Fragment } from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
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
  onPrint: () => void;
  onClose: () => void;
}

export function PinModal(props: Props) {

  const {
    open,
    title,
    transaction,
    onPrint,
    onClose
  } = props;

  return (
    <DetailModal
      open={open}
      title={title}
      onClose={onClose}>
      <ModalContent>
        {transaction &&
          <Fragment>
            <DetailModalItem title='Compañía' text={transaction.product.name}/>
            <DetailModalItem title='Precio' text={formatCurrency(transaction.amount)} color='green'/>
            <DetailModalItem title='Beneficio' text={formatCurrency(transaction.profit)} color='green'/>
          </Fragment>
        }
      </ModalContent>
      <ModalOptions>
        <OutlineButton 
          icon='receipt'
          text='Imprimir' 
          onClick={onPrint} />
      </ModalOptions>
    </DetailModal>
  );
}
