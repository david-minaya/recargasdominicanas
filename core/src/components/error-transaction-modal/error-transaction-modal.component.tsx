import React from 'react';
import { BaseModal } from '../base-modal/base-modal.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { Receipt } from '../receipt/receipt.component';
import { IProduct } from '../../types';
import { formatPhone } from '../../utils/formatPhone';
import { formatCurrency } from '../../utils/formatCurrency';
import { OutlineButton } from '../outline-button/outline-button.component';
import { ModalActions } from '../modal-actions/modal-actions.component';
import { Error } from '../error/error.component';
import { Style, mergeStyle } from './error-transaction-modal.module.css';
import { DetailItem } from '../detail-item/detail-item.component';

interface Props {
  open: boolean;
  phone: string;
  amount: number;
  product: IProduct;
  error: string;
  style?: Style;
  onClose: () => void;
}

export function ErrorTransactionModal(props: Props) {

  const {
    open,
    phone,
    amount,
    product,
    error,
    style: customStyle,
    onClose
  } = props;

  if (!open) return null;

  const style = mergeStyle(customStyle);

  return (
    <BaseModal
      open={open} 
      title='Ocurrio un error'
      style={{ card: style.card }}
      onClose={onClose}>
      <ModalContent>
        <Receipt
          title={product.name}
          image={product.image}>
          <DetailItem title='Tipo' text={product.type}/>
          <DetailItem title='Teléfono' text={formatPhone(phone)}/>
          <DetailItem title='Monto' text={formatCurrency(amount)}/>
        </Receipt>
        <Error 
          show={true}
          style={style.error} 
          message={error}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton text='Aceptar' onClick={onClose} />
      </ModalActions>
    </BaseModal>
  );
}
