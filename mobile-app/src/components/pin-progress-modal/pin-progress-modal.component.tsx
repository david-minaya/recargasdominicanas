import React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';
import { Modal, ModalContent, ModalToolbar } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './pin-progress-modal.module.css';

interface Props {
  open: boolean;
  title: string;
  progress: number;
  quantity: number;
  style?: Style;
}

export function PinProgressModal(props: Props) {

  const { 
    open,
    title,
    progress,
    quantity,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <Modal
      open={open}
      overlayEnterAnimation={false}
      style={{ card: style.card }}>
      <ModalToolbar style={style.modalToolbar} title={title}/>
      <ModalContent className={style.modalContent}>
        <div className={style.circularProgressContainer}>
          <CircularProgress
            className={style.circularProgress} 
            size={80}/>
        </div>
        {quantity > 1 &&
          <div className={style.progressText}>
            <span>Realizando operacion...</span>
            <span>{progress} de {quantity}</span>
          </div>
        }
      </ModalContent>
    </Modal>
  );
}

