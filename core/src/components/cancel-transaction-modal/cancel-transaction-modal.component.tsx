import React from 'react';
import { BaseModal } from '../base-modal/base-modal.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { Receipt } from '../receipt/receipt.component';
import { ITransaction } from '../../types';
import { formatPhone } from '../../utils/formatPhone';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatRef } from '../../utils';
import { ModalActions } from '../modal-actions/modal-actions.component';
import { Button } from '../button/button.component';
import { OutlineButton } from '../outline-button/outline-button.component';
import { DetailItem } from '../detail-item/detail-item.component';
import { Style, mergeStyle } from './cancel-transaction-modal.module.css';

interface Props {
  open: boolean;
  transaction: ITransaction;
  style?: Style;
  onAccept: () => void;
  onClose: () => void;
}

export function CancelTransactionModal(props: Props) {

  const {
    open,
    transaction,
    style: customStyle,
    onAccept,
    onClose
  } = props;

  if (!open) return null;

  const style = mergeStyle(customStyle);

  return (
    <BaseModal
      open={true} 
      title={`Cancelar ${transaction.product.type.toLowerCase()}`}
      style={style}
      onClose={onClose}>
      <ModalContent>
        <Receipt
          title={transaction.product.name}
          image={transaction.product.image}>
          <DetailItem title='Teléfono' text={formatPhone(transaction.phone)}/>
          <DetailItem title='Monto' text={formatCurrency(transaction.amount)}/>
          <DetailItem title='Referencia' text={formatRef(transaction.reference!)}/>
        </Receipt>
      </ModalContent>
      <ModalActions>
        <Button 
          text='Cancelar'
          onClick={onClose}/>
        <OutlineButton 
          text='Aceptar'
          onClick={onAccept}/>
      </ModalActions>
    </BaseModal>
  );
}
