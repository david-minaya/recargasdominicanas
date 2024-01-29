import React from 'react';
import { Modal, ModalContent, ModalToolbar } from '@recargas-dominicanas/core/components';
import { style } from './quantity-modal.module.css';

interface Props {
  open: boolean;
  quantities: number[];
  onClick: (value: number) => void;
  onClose: () => void;
}

export function QuantityModal(props: Props) {

  const {
    open,
    quantities,
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
        title='Cantidad' 
        onClose={handleClose}/>
      <ModalContent className={style.modalContent}>
        {quantities?.map(quantity => 
          <div 
            key={quantity}
            className={style.item} 
            onClick={() => handleClick(quantity)}>
            <div className={style.itemTitle}>{quantity}</div>
            <div className={style.itemLine}/>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
