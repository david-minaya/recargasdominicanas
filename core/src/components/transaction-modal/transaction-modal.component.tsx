import React from 'react';
import { BaseModal } from '../base-modal/base-modal.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { Receipt } from '../receipt/receipt.component';
import { ITransaction } from '../../types';
import { formatPhone } from '../../utils/formatPhone';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { formatRef } from '../../utils';
import { ModalOptions } from '../modal-options/modal-options.component';
import { OutlineButton } from '../outline-button/outline-button.component';
import { expired } from '../../utils/expired';
import { DetailItem } from '../detail-item/detail-item.component';

interface Props {
  title: string;
  open: boolean;
  transaction: ITransaction;
  onClose: () => void;
  onCancel?: () => void;
}

export function TransactionModal(props: Props) {

  const {
    title,
    open,
    transaction,
    onClose,
    onCancel
  } = props;

  if (!open) return null;

  function showCancelButton() {
    return (
      transaction.product.type === 'Recarga' &&
      onCancel && 
      !transaction.cancelled && 
      !expired(transaction)
    );
  }

  return (
    <BaseModal
      open={open} 
      title={title}
      onClose={onClose}>
      <ModalContent>
        <Receipt
          title={transaction.product.name}
          image={transaction.product.image}>
          <DetailItem title='Tipo' text={transaction.product.type}/>
          <DetailItem title='Teléfono' text={formatPhone(transaction.phone)}/>
          <DetailItem title='Monto' text={formatCurrency(transaction.amount)}/>
          <DetailItem title='Ganancia' text={formatCurrency(transaction.profit)}/>
          <DetailItem title='Fecha' text={formatDate(transaction.date)}/>
          {transaction.reference && 
            <DetailItem title='Referencia' text={formatRef(transaction.reference)}/>
          }
        </Receipt>
      </ModalContent>
      <ModalOptions>
        <OutlineButton 
          icon='receipt' 
          text='Reimprimir recibo'/>
        {showCancelButton() &&
          <OutlineButton 
            icon='close'
            text='Cancelar recarga'
            onClick={onCancel}/>
        }
      </ModalOptions>
    </BaseModal>
  );
}
