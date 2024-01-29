import React from 'react';
import { style } from './confirm-modal.module.css';

import { 
  Modal, 
  ModalToolbar, 
  ModalContent,
  ModalActions,
  OutlineButton
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  title: string;
  description: string;
  overlayEnterAnimation?: boolean;
  onClose: () => void;
}

export function ConfirmModal(props: Props) {

  const {
    open,
    title,
    description,
    overlayEnterAnimation = false,
    onClose
  } = props;

  return (
    <Modal 
      open={open}
      style={style.modal}
      overlayEnterAnimation={overlayEnterAnimation}>
      <ModalToolbar
        style={style.modalToolbar} 
        title={title}/>
      <ModalContent className={style.modalContent}>
        {description}
      </ModalContent>
      <ModalActions style={style.actionButton}>
        <OutlineButton
          text='Aceptar'
          onClick={onClose}/>
      </ModalActions>
    </Modal>
  );
}
