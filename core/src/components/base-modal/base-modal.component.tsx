import React, { ReactElement } from 'react';
import { findChild } from '../../utils';
import { Modal } from '../modal/modal.component';
import { ModalActions } from '../modal-actions/modal-actions.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { ModalOptions } from '../modal-options/modal-options.component';
import { ModalToolbar } from '../modal-toolbar/modal-toolbar.component';
import { Style, mergeStyle } from './base-modal.module.css';

interface Props {
  title: string,
  open: boolean,
  showCloseOption?: boolean,
  overlayEnterAnimation?: boolean,
  children: ReactElement | ReactElement[],
  style?: Style,
  onClose?: () => void
}

export function BaseModal(props: Props) {

  const {
    title,
    open = false,
    children: _children,
    showCloseOption = true,
    overlayEnterAnimation,
    style: customStyle,
    onClose
  } = props;

  const style = mergeStyle(customStyle);

  const children = Array.isArray(_children) ? _children : [_children];
  const modalContent = findChild(children, ModalContent);
  const modalOptions = findChild(children, ModalOptions);
  const modalActions = findChild(children, ModalActions);

  return (
    <Modal 
      open={open}
      style={style}
      overlayEnterAnimation={overlayEnterAnimation}
      onClose={onClose}>
      <ModalToolbar
        style={style.toolbar}
        title={title}
        onClose={showCloseOption ? onClose : undefined}/>
      {modalContent}
      {modalOptions}
      {modalActions}
    </Modal>
  );
}
