import React, { useState } from 'react';
import { Style, mergeStyle } from './business-user-confirm-modal.module.css';
import { IBusinessUser } from '@recargas-dominicanas/core/types';

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
  businessUser: IBusinessUser,
  style?: Style,
  onConfirm: (id: number) => void,
  onClose: () => void
}

export function BusinessUserConfirmModal(props: Props) {

  const {
    open,
    title,
    description,
    style: customStyle,
    businessUser,
    onConfirm,
    onClose
  } = props;

  const style = mergeStyle(customStyle);
  const [check, setCheck] = useState(false);

  function handleClose() {
    setCheck(false);
    onClose();
  }

  async function handleConfirm() {
    onConfirm(businessUser.id);
    handleClose();
  }

  return (
    <Modal 
      open={open}
      style={style.deleteModal}
      onClose={handleClose}>
      <ModalToolbar 
        title={title}
        style={style.toolbar}
        onClose={handleClose}/>
      <ModalContent>
        <div className={style.item}>
          <span className={style.itemTitle}>{businessUser.name}</span>
          <span className={style.username}>{businessUser.userName}</span>
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
