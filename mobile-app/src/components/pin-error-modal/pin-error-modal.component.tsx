import React from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { style } from './pin-error-modal.module.css';

import { 
  BaseModal,
  Error,
  ModalContent,
  DetailItem, 
  ModalActions, 
  OutlineButton 
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  price: number;
  progress: number;
  quantity: number;
  error: string;
  onClose: () => void;
}

export function PinErrorModal(props: Props) {

  const {
    open,
    price,
    progress,
    quantity,
    error,
    onClose
  } = props;

  return (
    <BaseModal
      open={open} 
      title='Ocurrio un error'
      style={{ card: style.card }}
      overlayEnterAnimation={false}
      onClose={onClose}>
      <ModalContent className={style.content}>
        <div>
          {quantity === 1 &&
            <DetailItem
              style={style.detailItem} 
              title='Cantidad' 
              text='1'/>
          }
          {quantity > 1 &&
            <DetailItem
              style={style.detailItem} 
              title='Pines vendidos' 
              text={`${progress} de ${quantity}`}/>
          }
          <DetailItem
            style={style.detailItem}
            title='Precio' 
            text={formatCurrency(price)}
            weight='medium'
            color='green'/>
        </div>
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
