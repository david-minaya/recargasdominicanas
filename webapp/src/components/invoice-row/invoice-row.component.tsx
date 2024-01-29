import React, { Fragment, useState } from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { LoadingModal } from '@recargas-dominicanas/core/components';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { InvoiceCancelModal } from '../invoice-cancel-modal/invoice-cancel-modal.component';
import { InvoiceModal } from '../invoice-modal/invoice-modal.component';
import { ErrorModal } from '../error-modal/error-modal.component';
import { printInvoice } from '../../utils/printInvoice';
import { TransactionRow } from '../transaction-row/transaction-row.component';

interface Props {
  transaction: ITransaction;
}

export function InvoiceRow(props: Props) {

  const {
    transaction
  } = props;

  const businessStore = useBusiness();
  const salesReport = useSalesReport();
  const transactions = useTransactions();
  const business = businessStore.get();
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);

  function handleOpenCancelModal() {
    setOpenInvoiceModal(false);
    setOpenCancelModal(true);
  }

  async function handleCancel() {

    setOpenCancelModal(false);
    setOpenLoadingModal(true);

    try {

      await TransactionApi.cancelInvoice(transaction.id);
      
      await Promise.allSettled([
        salesReport.fetchCurrent(),
        transactions.fetchGroupByDay(1, 50)
      ]);

      setOpenLoadingModal(false);
      setOpenSuccessfulModal(true);
    
    } catch {

      setOpenLoadingModal(false);
      setOpenErrorModal(true);
    }
  }

  return (
    <Fragment>
      <TransactionRow 
        key={transaction.id} 
        transaction={transaction}
        onClick={() => setOpenInvoiceModal(true)}
        onPrint={() => printInvoice(business, transaction)}
        onCancel={handleOpenCancelModal}/>
      <InvoiceModal
        open={openInvoiceModal}
        title='Factura'
        transaction={transaction}
        onPrint={() => printInvoice(business, transaction)}
        onCancel={handleOpenCancelModal}
        onClose={() => setOpenInvoiceModal(false)}/>
      <InvoiceCancelModal
        open={openCancelModal}
        transaction={transaction}
        overlayEnterAnimation={false}
        onAccept={handleCancel}
        onClose={() => setOpenCancelModal(false)}/>
      <LoadingModal
        open={openLoadingModal}
        title='Cancelando pago'
        overlayEnterAnimation={false}/>
      <InvoiceModal
        open={openSuccessfulModal}
        title='Pago cancelado'
        transaction={transaction}
        overlayEnterAnimation={false}
        onPrint={() => printInvoice(business, transaction!)}
        onClose={() => setOpenSuccessfulModal(false)}/>
      <ErrorModal
        open={openErrorModal}
        overlayEnterAnimation={false}
        title='Error cancelando pago'
        description='Ocurrio un error al cancelar el pago.'
        onClose={() => setOpenErrorModal(false)}/>
    </Fragment>
  );
}
