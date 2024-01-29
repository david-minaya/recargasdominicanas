import React from 'react';
import { ISalesReport } from '@recargas-dominicanas/core/types';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { DetailModal } from '../detail-modal/detail-modal.component';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';

import {
  ModalContent,
  OutlineButton, 
  ModalOptions
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  salesReport: ISalesReport;
  onPrint: () => void;
  onClose: () => void;
}

export function SalesReportSuccessfulModal(props: Props) {

  const {
    open,
    salesReport,
    onPrint,
    onClose
  } = props;

  return (
    <DetailModal
      open={open} 
      title='Cierre de ventas exitoso'
      overlayEnterAnimation={false}
      onClose={onClose}>
      <ModalContent>
        <DetailModalItem title='Balance' color='green' text={formatCurrency(salesReport.balance)}/>
        <DetailModalItem title='Ventas' color='green' text={formatCurrency(salesReport.sales)}/>
        <DetailModalItem title='Balance consumido' color='green' text={formatCurrency(salesReport.sales - salesReport.profit)}/>
        <DetailModalItem title='Beneficio' color='green' text={formatCurrency(salesReport.profit)}/>
        <DetailModalItem title='Fecha' text={formatDate(salesReport.date)}/>
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
