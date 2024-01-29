import React from 'react';
import { formatCurrency, formatDate } from '../../utils';
import { ISalesReport } from '../../types';
import { style } from './sales-report-modal.module.css';

import { 
  DetailItem, 
  Modal, 
  ModalActions, 
  ModalContent, 
  ModalToolbar, 
  OutlineButton 
} from '../../components';

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

  if (!salesReport) return null;

  return (
    <Modal
      style={style.modal} 
      open={open} 
      onClose={onClose}>
      <ModalToolbar 
        title='Cierre de ventas' 
        onClose={onClose}/>
      <ModalContent className={style.modalContent}>
        <DetailItem
          title='Fecha' 
          text={formatDate(salesReport.date)}/>
        <DetailItem 
          color='green' 
          weight='medium'
          title='Balance' 
          text={formatCurrency(salesReport.balance)}/>
        <DetailItem 
          color='green'
          weight='medium'
          title='Venta'
          text={formatCurrency(salesReport.sales)}/>
        <DetailItem 
          color='green'
          weight='medium'
          title='Beneficio' 
          text={formatCurrency(salesReport.profit)}/>
      </ModalContent>
      <ModalActions>
        <OutlineButton
          text='Hacer cierre'
          onClick={onAccept}/>
      </ModalActions>
    </Modal>
  );
}
