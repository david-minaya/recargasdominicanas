import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { expired, formatCurrency, formatDate, formatPhone, formatRef } from '@recargas-dominicanas/core/utils';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { useBusiness, useTransactions, useSalesReport } from '@recargas-dominicanas/core/store';
import { LoadingModal, OutlineButton, Toast, Image, DetailItem } from '@recargas-dominicanas/core/components';
import { printTransaction } from '../../utils/printTransaction';
import { TopupCancelModal } from '../../components/topup-cancel-modal/topup-cancel-modal.component';
import { Page } from '../../components/page/page.component';
import { style } from './topup-details.module.css';

export function TopupDetails() {

  const Business = useBusiness();
  const Transactions = useTransactions();
  const SalesReport = useSalesReport();
  const query = useParams<{ id: string }>();
  const business = Business.get();
  const transaction = Transactions.get(parseInt(query.id));
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  async function handleCancel() {
    
    try {

      setOpenCancelModal(false);
      setOpenLoadingModal(true);

      await BusinessUserApi.cancelTransaction(transaction!.id);

      await Promise.allSettled([
        printTransaction(business, { ...transaction!, cancelled: true }),
        SalesReport.fetch(),
        Transactions.fetch(1, 25)
      ]);

      setShowSuccessToast(true);
      setOpenLoadingModal(false);

    } catch(err: any) {

      setShowErrorToast(true);
      setOpenLoadingModal(false);
    }
  }

  async function handlePrint() {
    await printTransaction(business, transaction!);
  }

  if (!transaction) {
    return <Redirect to='/'/>;
  }

  return (
    <Page 
      title='Recarga'
      animate={true}>
      <div className={style.product}>
        <Image 
          className={style.productImage} 
          src={transaction.product.image}/>
        <span className={style.productName}>
          {transaction.product.name}
        </span>
      </div>
      <div className={style.items}>
        <DetailItem
          style={style.detailItem} 
          title='Teléfono' 
          text={formatPhone(transaction.phone)}
          weight='medium'/>  
        <DetailItem 
          style={style.detailItem}
          title='Monto' 
          text={formatCurrency(transaction.amount)}
          color='green'
          weight='medium'/>
        <DetailItem
          style={style.detailItem}
          title='Beneficio' 
          text={formatCurrency(transaction.profit)}
          color='green'
          weight='medium'/>
        <DetailItem
          style={style.detailItem}
          title='Fecha'
          text={formatDate(transaction.date)}
          weight='medium'/>
        <DetailItem
          style={style.detailItem}
          title='Referencia'
          text={formatRef(transaction.reference!)}
          weight='medium'/>
        {transaction.cancelled &&
          <DetailItem
            style={style.detailItem}
            title='Estado'
            text='Cancelada'
            weight='medium'/>
        }
      </div>
      <div className={style.buttonsContainer}>
        <OutlineButton
          style={style.button}
          icon='receipt'
          text='Reimprimir recibo'
          onClick={handlePrint}/>
        <OutlineButton
          style={style.button}
          icon='cancel'
          text='Cancelar recarga'
          disabled={transaction.cancelled || expired(transaction)}
          onClick={() => setOpenCancelModal(true)}/>
      </div>
      <TopupCancelModal
        open={openCancelModal}
        transaction={transaction}
        onAccept={handleCancel}
        onClose={() => setOpenCancelModal(false)}/>
      <LoadingModal
        style={style.loadingModal}
        open={openLoadingModal}
        title='Cancelando recarga'/>
      <Toast
        show={showSuccessToast}
        text='Recarga cancelada'
        onClose={() => setShowSuccessToast(false)}/>
      <Toast
        show={showErrorToast}
        text='Ocurrió un error al cancelar la recarga'
        onClose={() => setShowErrorToast(false)}/>
    </Page>
  );
}
