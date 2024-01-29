import React from 'react';
import { BaseModal } from '../base-modal/base-modal.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { Receipt } from '../receipt/receipt.component';
import { IProduct } from '../../types';
import { formatPhone } from '../../utils/formatPhone';
import { formatCurrency } from '../../utils/formatCurrency';
import { OutlineButton } from '../outline-button/outline-button.component';
import { Button } from '../button/button.component';
import { ModalActions } from '../modal-actions/modal-actions.component';
import { DetailItem } from '../detail-item/detail-item.component';

interface Props {
  open: boolean;
  phone: string;
  amount: number;
  product: IProduct;
  style?: any;
  onAccept: () => void;
  onClose: () => void;
}

export function ConfirmTransactionModal(props: Props) {

  const {
    open,
    phone,
    amount,
    product,
    style,
    onAccept,
    onClose
  } = props;

  if (!open) return null;

  return (
    <BaseModal
      open={open} 
      title='Confimar'
      onClose={onClose}
      style={{ card: style?.card }}>
      <ModalContent>
        <Receipt
          title={product.name}
          image={product.image}>
          <DetailItem title='Tipo' text={product.type}/>
          <DetailItem title='Teléfono' text={formatPhone(phone)}/>
          <DetailItem title='Monto' text={formatCurrency(amount)}/>
        </Receipt>
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Aceptar' onClick={onAccept} />
      </ModalActions>
    </BaseModal>
  );
}
