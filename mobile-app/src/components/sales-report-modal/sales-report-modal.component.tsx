import React, { useState } from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { ISalesReport } from '@recargas-dominicanas/core/types';
import { style } from './sales-report-modal.module.css';

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
  onAccept: () => Promise<void>;
  onClose: () => void;
}

export function SalesReportModal(props: Props) {

  const {
    open,
    salesReport,
    onAccept,
    onClose
  } = props;

  const [disabled, setDisabled] = useState(false);

  async function handleAccept() {
    setDisabled(true);
    await onAccept();
    setDisabled(false);
  }

  return (
    <BaseModal
      open={open} 
      title='Realizar cierre de ventas'
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
        <OutlineButton 
          text='Realizar'
          disabled={disabled}
          onClick={handleAccept}/>
      </ModalActions>
    </BaseModal>
  );
}
