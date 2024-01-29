import React, { useState } from 'react';
import clsx from 'clsx';
import { ISalesReport } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { Icon } from '@recargas-dominicanas/core/components';
import { CurrentSalesReportModal } from '../current-sales-report-modal/current-sales-report-modal.component';
import { style } from './sales-report-bar.module.css';

interface Props {
  salesReport: ISalesReport;
}

export function SalesReportBar(props: Props) {

  const { salesReport } = props;

  const isLowBalance = salesReport.balance < 1000;
  const [openModal, setOpenModal] = useState(false);

  return (
    <div 
      className={style.container}>
      <div className={style.left}>
        {!isLowBalance 
          ? <Icon icon='payments' className={style.balanceIcon}/>
          : <Icon icon='error_outline' className={style.lowBalanceIcon}/>
        }
        <span className={style.title}>Balance</span>
      </div>
      <div 
        className={style.right}
        onClick={() => setOpenModal(true)}>
        <span 
          className={clsx(style.balance, isLowBalance && style.lowBalance)}>
          {formatCurrency(salesReport.balance)}
        </span>
        <Icon className={style.icon} icon='chevron_right'/>
      </div>
      <CurrentSalesReportModal
        open={openModal}
        salesReport={salesReport}
        onClose={() => setOpenModal(false)}/>
    </div>
  );
}
