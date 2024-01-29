import React, { Fragment } from 'react';
import { IDataPlan } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatPhone } from '@recargas-dominicanas/core/utils';
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
  phone: string;
  dataPlan?: IDataPlan;
  onAccept: () => void;
  onClose: () => void;
}

export function DataPlanConfirmModal(props: Props) {

  const {
    open,
    company,
    phone,
    dataPlan,
    onAccept,
    onClose
  } = props;

  return (
    <DetailModal
      open={open}
      title='Confirmar paquetico'>
      <ModalContent>
        {dataPlan &&
          <Fragment>
            <DetailModalItem title='Compañía' text={company}/>
            <DetailModalItem title='Teléfono' text={formatPhone(phone)}/>
            <DetailModalItem title='Plan de datos' text={dataPlan.name}/>
            <DetailModalItem title='Precio' text={formatCurrency(dataPlan.price)} color='green'/>
          </Fragment>
        }
      </ModalContent>
      <ModalActions>
        <Button text='Cancelar' onClick={onClose}/>
        <OutlineButton text='Aceptar' onClick={onAccept} />
      </ModalActions>
    </DetailModal>
  );
}
