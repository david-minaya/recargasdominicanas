import React, { Fragment, useState } from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { LoadingModal } from '@recargas-dominicanas/core/components';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { TopupCancelModal } from '../topup-cancel-modal/topup-cancel-modal.component';
import { TransactionRow } from '../transaction-row/transaction-row.component';
import { TopupModal } from '../topup-modal/topup-modal.component';
import { ErrorModal } from '../error-modal/error-modal.component';
import { printTopup } from '../../utils/printToup';

interface Props {
  transaction: ITransaction;
}

export function TopupRow(props: Props) {

  const {
    transaction
  } = props;

  const businessStore = useBusiness();
  const salesReport = useSalesReport();
  const transactions = useTransactions();
  const business = businessStore.get();
  const [openTopupModal, setOpenTopupModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);

  function handleOpenCancelModal() {
    setOpenTopupModal(false);
    setOpenCancelModal(true);
  }

  async function handleCancel() {

    setOpenCancelModal(false);
    setOpenLoadingModal(true);

    try {

      await BusinessUserApi.cancelTransaction(transaction.id);
      
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
        onClick={() => setOpenTopupModal(true)}
        onPrint={() => printTopup(business, transaction)}
        onCancel={handleOpenCancelModal}/>
      <TopupModal
        open={openTopupModal}
        title='Recarga'
        transaction={transaction}
        onPrint={() => printTopup(business, transaction)}
        onCancel={handleOpenCancelModal}
        onClose={() => setOpenTopupModal(false)}/>
      <TopupCancelModal
        open={openCancelModal}
        transaction={transaction}
        overlayEnterAnimation={false}
        onAccept={handleCancel}
        onClose={() => setOpenCancelModal(false)}/>
      <LoadingModal
        open={openLoadingModal}
        title='Cancelando recarga'
        overlayEnterAnimation={false}/>
      <TopupModal
        open={openSuccessfulModal}
        title='Recarga cancelada'
        transaction={transaction}
        overlayEnterAnimation={false}
        onPrint={() => printTopup(business, transaction!)}
        onClose={() => setOpenSuccessfulModal(false)}/>
      <ErrorModal
        open={openErrorModal}
        overlayEnterAnimation={false}
        title='Error cancelando recarga'
        description='Ocurrio un error al cancelar la recarga.'
        onClose={() => setOpenErrorModal(false)}/>
    </Fragment>
  );
}
