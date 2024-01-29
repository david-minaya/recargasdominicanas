import React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';
import { Modal } from '../modal/modal.component';
import { ModalToolbar } from '../modal-toolbar/modal-toolbar.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { Style, mergeStyle } from './loading-modal.module.css';

interface Props {
  open: boolean;
  title: string;
  overlayEnterAnimation?: boolean;
  style?: Style;
}

export function LoadingModal(props: Props) {

  const { 
    open,
    title,
    overlayEnterAnimation = false,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <Modal
      open={open}
      overlayEnterAnimation={overlayEnterAnimation}
      style={{ card: style.card }}>
      <ModalToolbar style={style.modalToolbar} title={title}/>
      <ModalContent className={style.modalContent}>
        <CircularProgress
          className={style.circularProgress} 
          size={80}/>
      </ModalContent>
    </Modal>
  );
}
