import React, { ReactNode } from 'react';
import { Modal, ModalToolbar } from '@recargas-dominicanas/core/components';
import { style } from './detail-modal.module.css';

interface Props {
  open: boolean;
  title: string;
  overlayEnterAnimation?: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export function DetailModal(props: Props) {

  const {
    open,
    title,
    overlayEnterAnimation,
    children,
    onClose
  } = props;

  return (
    <Modal
      open={open}
      style={style.modal}
      overlayEnterAnimation={overlayEnterAnimation}
      onClose={onClose}>
      <ModalToolbar
        style={style.toolbar}
        title={title}
        onClose={onClose}/>
      {children}
    </Modal>
  );
}
