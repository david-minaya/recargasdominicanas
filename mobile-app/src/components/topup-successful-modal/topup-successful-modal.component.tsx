import React from 'react';
import { formatCurrency, formatDate, formatPhone, formatRef } from '@recargas-dominicanas/core/utils';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { style } from './topup-successful-modal.module.css';

import { 
  BaseModal, 
  ModalContent,
  DetailItem, 
  ModalActions,
  OutlineButton,
  Button
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  transaction?: ITransaction;
  onPrint: ()=> void;
  onClose: () => void;
}

export function TopupSuccessfulModal(props: Props) {

  const {
    open,
    transaction,
    onPrint,
    onClose
  } = props;

  if (!transaction) return null;

  return (
    <BaseModal
      open={open} 
      title='Recarga exitosa'
      overlayEnterAnimation={false}
      style={{ card: style?.card }}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='Teléfono'
          weight='medium'
          text={formatPhone(transaction.phone)}/>
        <DetailItem
          style={style.detailItem}
          title='Monto'
          color='green'
          weight='medium'
          text={formatCurrency(transaction.amount)}/>
        <DetailItem
          style={style.detailItem}
          title='Beneficio'
          color='green'
          weight='medium'
          text={formatCurrency(transaction.profit)}/>
        <DetailItem
          style={style.detailItem}
          title='Fecha'
          text={formatDate(transaction.date)}
          weight='medium'/>
        {transaction.reference &&
          <DetailItem
            style={style.detailItem}
            title='Referencia'
            text={formatRef(transaction.reference!)}
            weight='medium'/>
        }
      </ModalContent>
      <ModalActions>
        <Button text='Reimprimir' onClick={onPrint}/>
        <OutlineButton text='Aceptar' onClick={onClose}/>
      </ModalActions>
    </BaseModal>
  );
}
