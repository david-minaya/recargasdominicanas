import React from 'react';
import { ConfirmModal } from '../confirm-modal/confirm-modal.component';

interface Props {
  open: boolean;
  overlayEnterAnimation?: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export function ErrorModal(props: Props) {
  return (
    <ConfirmModal {...props}/>
  );
}
