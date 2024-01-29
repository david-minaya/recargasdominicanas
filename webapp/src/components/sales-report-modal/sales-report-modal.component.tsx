import React from 'react';
import { ISalesReport } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { DetailModal } from '../detail-modal/detail-modal.component';
import { DetailModalItem } from '../detail-modal-item/detail-modal-item.component';

import {
  ModalContent,
  ModalActions,
  OutlineButton 
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  salesReport: ISalesReport;
  onAccept: () => void;
  onClose: () => void;
}

export function SalesReportModal(props: Props) {

  const {
    open,
    salesReport,
    onAccept,
    onClose
  } = props;

  return (
    <DetailModal
      open={open} 
      title='Cierre de ventas'
      onClose={onClose}>
      <ModalContent>
        <DetailModalItem title='Balance' color='green' text={formatCurrency(salesReport.balance)}/>
        <DetailModalItem title='Ventas' color='green' text={formatCurrency(salesReport.sales)}/>
        <DetailModalItem title='Balance consumido' color='green' text={formatCurrency(salesReport.sales - salesReport.profit)}/>
        <DetailModalItem title='Beneficio' color='green' text={formatCurrency(salesReport.profit)}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton 
          text='Realizar'
          onClick={onAccept}/>
      </ModalActions>
    </DetailModal>
  );
}
