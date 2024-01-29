import React from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { ISalesReport } from '@recargas-dominicanas/core/types';
import { style } from './current-sales-report-modal.module.css';

import { 
  BaseModal, 
  ModalContent,
  DetailItem, 
  ModalActions,
  OutlineButton 
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  salesReport: ISalesReport;
  onClose: () => void;
}

export function CurrentSalesReportModal(props: Props) {

  const {
    open,
    salesReport,
    onClose
  } = props;

  return (
    <BaseModal
      open={open} 
      title='Reporte de ventas'
      showCloseOption={false}
      style={{ card: style?.card }}
      onClose={onClose}>
      <ModalContent>
        <DetailItem
          style={style.detailItem}
          title='Balance'
          color='green'
          weight='medium'
          text={formatCurrency(salesReport.balance)}/>
        <DetailItem
          style={style.detailItem}
          title='Ventas'
          color='green'
          weight='medium'
          text={formatCurrency(salesReport.sales)}/>
        <DetailItem
          style={style.detailItem}
          title='Balance consumido'
          color='green'
          weight='medium'
          text={formatCurrency(salesReport.sales - salesReport.profit)}/>
        <DetailItem
          style={style.detailItem}
          title='Beneficio'
          color='green'
          weight='medium'
          text={formatCurrency(salesReport.profit)}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton text='Aceptar' onClick={onClose}/>
      </ModalActions>
    </BaseModal>
  );
}
