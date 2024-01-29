import React, { ReactElement } from 'react';
import { BaseModal } from '../base-modal/base-modal.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { Receipt } from '../receipt/receipt.component';
import { ITransaction } from '../../types';
import { formatPhone } from '../../utils/formatPhone';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { formatRef } from '../../utils';
import { DetailItem } from '../detail-item/detail-item.component';

interface Props {
  title: string
  open: boolean,
  transaction: ITransaction,
  children: ReactElement,
  onClose: () => void
}

export function ReceiptModal(props: Props) {

  const {
    title,
    open,
    transaction,
    children,
    onClose
  } = props;

  return !open ? null : (
    <BaseModal
      open={open} 
      title={title}
      onClose={onClose}>
      <ModalContent>
        <Receipt
          title={`${transaction.product.type} ${transaction.product.name}`}
          image={transaction.product.image}>
          <DetailItem title='Teléfono' text={formatPhone(transaction.phone)}/>
          <DetailItem title='Monto' text={formatCurrency(transaction.amount)}/>
          <DetailItem title='Ganancia' text={formatCurrency(transaction.profit)}/>
          <DetailItem title='Fecha' text={formatDate(transaction.date)}/>
          {transaction.reference && 
            <DetailItem title='Referencia' text={formatRef(transaction.reference)}/>
          }
        </Receipt>
      </ModalContent>
      {children}
    </BaseModal>
  );
}
