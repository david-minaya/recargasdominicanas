import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { expired, formatCurrency, formatDate, formatRef } from '@recargas-dominicanas/core/utils';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { LoadingModal, OutlineButton, Toast, Image, DetailItem } from '@recargas-dominicanas/core/components';
import { printInvoice } from '../../utils/printInvoice';
import { InvoiceCancelModal } from '../../components/invoice-cancel-modal/invoice-cancel-modal.component';
import { Page } from '../../components/page/page.component';
import { style } from './invoice-details.module.css';

export function InvoiceDetails() {

  const Business = useBusiness();
  const SalesReport = useSalesReport();
  const Transactions = useTransactions();
  const query = useParams<{ id: string }>();
  const business = Business.get();
  const transaction = Transactions.get(parseInt(query.id));
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  async function handleCancel() {

    setOpenCancelModal(false);
    setOpenLoadingModal(true);

    try {

      await TransactionApi.cancelInvoice(transaction!.id);
      
      await Promise.allSettled([
        printInvoice(business, { ...transaction!, cancelled: true }),
        SalesReport.fetch(),
        Transactions.fetch(1, 25)
      ]);
      
      setOpenLoadingModal(false);
      setShowSuccessToast(true);

    } catch(err: any) {

      setOpenLoadingModal(false);
      setShowErrorToast(true);
    }
  }

  async function handlePrint() {
    await printInvoice(business, transaction!);
  }

  if (!transaction) {
    return <Redirect to='/'/>;
  }

  return (
    <Page 
      title='Factura'
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
          title='No. contrato' 
          text={transaction.contract!.nic}
          weight='medium'/>
        <DetailItem
          style={style.detailItem} 
          title='Titular' 
          text={transaction.contract!.name}
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
          text='Cancelar factura'
          disabled={transaction.cancelled || expired(transaction)}
          onClick={() => setOpenCancelModal(true)}/>
      </div>
      <InvoiceCancelModal
        open={openCancelModal}
        invoice={transaction}
        onAccept={handleCancel}
        onClose={() => setOpenCancelModal(false)}/>
      <LoadingModal
        style={style.loadingModal}
        open={openLoadingModal}
        title='Cancelando factura'/>
      <Toast
        show={showSuccessToast}
        text='Factura cancelada'
        onClose={() => setShowSuccessToast(false)}/>
      <Toast
        show={showErrorToast}
        text='Ocurrió un error al cancelar la factura'
        onClose={() => setShowErrorToast(false)}/>
    </Page>
  );
}
