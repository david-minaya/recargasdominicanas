import React from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { DetailModal } from '../detail-modal/detail-modal.component';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';

import { 
  ModalContent,
  ModalActions, 
  Button, 
  OutlineButton
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  company: string;
  price: number;
  onAccept: () => void;
  onClose: () => void;
}

export function PinConfirmModal(props: Props) {

  const {
    open,
    company,
    price,
    onAccept,
    onClose
  } = props;

  return (
    <DetailModal
      open={open}
      title='Confirmar pin'>
      <ModalContent>
        <DetailModalItem title='Compañía' text={company}/>
        <DetailModalItem title='Precio' text={formatCurrency(price)} color='green'/>
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Aceptar' onClick={onAccept} />
      </ModalActions>
    </DetailModal>
  );
}
