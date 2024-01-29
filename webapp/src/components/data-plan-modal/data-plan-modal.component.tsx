import React, { Fragment } from 'react';
import { IDataPlan, ITransaction } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatDate, formatPhone } from '@recargas-dominicanas/core/utils';
import { DetailModal } from '../detail-modal/detail-modal.component';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';

import { 
  ModalContent,
  OutlineButton,
  ModalOptions,
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  title: string;
  dataPlan?: IDataPlan;
  transaction?: ITransaction;
  onPrint: ()=> void;
  onClose: () => void;
}

export function DataPlanModal(props: Props) {

  const {
    open,
    title,
    dataPlan,
    transaction,
    onPrint,
    onClose
  } = props;

  return (
    <DetailModal
      open={open}
      overlayEnterAnimation={false}
      title={title}
      onClose={onClose}>
      <ModalContent>
        {transaction &&
          <Fragment>
            <DetailModalItem title='Compañía' text={transaction.product.name}/>
            <DetailModalItem title='Teléfono' text={formatPhone(transaction.phone)}/>
            {dataPlan &&
              <DetailModalItem title='Plan de datos' text={dataPlan.name}/>
            }
            <DetailModalItem title='Precio' text={formatCurrency(transaction.amount)} color='green'/>
            <DetailModalItem title='Beneficio' text={formatCurrency(transaction.profit)} color='green'/>
            <DetailModalItem title='Fecha' text={formatDate(transaction.date)}/>
          </Fragment>
        }
      </ModalContent>
      <ModalOptions>
        <OutlineButton 
          icon='receipt' 
          text='Imprimir' 
          onClick={onPrint}/>
      </ModalOptions>
    </DetailModal>
  );
}
