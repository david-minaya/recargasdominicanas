import React, { ReactNode, useState } from 'react';
import { Style, mergeStyle } from './confirm-modal.module.css';

import { 
  FillButton,
  Modal, 
  ModalActions, 
  ModalContent, 
  ModalToolbar, 
  OutlineButton
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean,
  title: string,
  description: string,
  style?: Style,
  children?: ReactNode,
  onConfirm: () => void,
  onClose: () => void
}

export function ConfirmModal(props: Props) {

  const {
    open,
    title,
    description,
    style: customStyle,
    children,
    onConfirm,
    onClose
  } = props;

  if (!open) return null;

  const style = mergeStyle(customStyle);
  const [check, setCheck] = useState(false);

  async function handleConfirm() {
    onConfirm();
    handleClose();
  }

  function handleClose() {
    setCheck(false);
    onClose();
  }

  style.modal = { card: `${style.modal.card} ${customStyle?.card}` };

  return (
    <Modal 
      open={true}
      style={style.modal}
      onClose={handleClose}>
      <ModalToolbar 
        title={title}
        style={style.toolbar}
        onClose={handleClose}/>
      <ModalContent>
        <div className={style.content}>
          {children}
        </div>
        <label className={style.label}>
          <input
            type='checkbox' 
            checked={check}
            className={style.checkbox}
            onChange={() => setCheck(check => !check)}/>
          {description}
        </label>
      </ModalContent>
      <ModalActions>
        <OutlineButton 
          text='Cancelar'
          onClick={handleClose}/>
        <FillButton 
          text='Aceptar' 
          disabled={!check}
          onClick={handleConfirm}/>
      </ModalActions>
    </Modal>
  );
}
