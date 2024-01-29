import React from 'react';
import { Modal, ModalContent, ModalToolbar } from '@recargas-dominicanas/core/components';
import { Price } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { style } from './price-modal.module.css';

interface Props {
  open: boolean;
  prices: Price[];
  onClick: (value: number) => void;
  onClose: () => void;
}

export function PriceModal(props: Props) {

  const {
    open,
    prices,
    onClick,
    onClose
  } = props;

  function handleClick(value: number) {
    onClick(value);
    handleClose();
  }

  function handleClose() {
    onClose();
  }

  return (
    <Modal 
      open={open}
      style={style.modal}
      onClose={handleClose}>
      <ModalToolbar
        style={style.modalToolbar} 
        title='Precio' 
        onClose={handleClose}/>
      <ModalContent className={style.modalContent}>
        {prices
          .slice()
          .sort((p1, p2) => p1.price - p2.price)
          .map(price => 
            <div 
              key={price.id}
              className={style.item} 
              onClick={() => handleClick(price.price)}>
              <div className={style.itemTitle}>{formatCurrency(price.price)}</div>
              <div className={style.itemLine}/>
            </div>
          )}
      </ModalContent>
    </Modal>
  );
}
