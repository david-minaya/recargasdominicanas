import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Invoice, IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { InvoiceModal } from '../../components/invoice-modal/invoice-modal.component';
import { printInvoice } from '../../utils/printInvoice';
import { InvoiceSuccessfulModal } from '../../components/invoice-successful-modal/invoice-successful-modal.component';
import { ErrorModal } from '../../components/error-modal/error-modal.component';
import { Page } from '../../components/page/page.component';
import { style } from './invoice.module.css';

import { 
  Image,
  LoadingModal,
  OutlineButton,
  TextField
} from '@recargas-dominicanas/core/components';

export function Invoice() {

  const Business = useBusiness();
  const SalesReport = useSalesReport();
  const Transactions = useTransactions();
  const location = useLocation<IProduct>();
  const contract = location.state;
  const business = Business.get();
  const salesReport = SalesReport.get();
  const form = useForm({ nic: '' });
  const [invoice, setInvoice] = useState<Invoice>();
  const [transaction, setTransaction] = useState<ITransaction>();
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [openGettingInvoiceModal, setOpenGettingInvoiceModal] = useState(false);
  const [openSendingInvoiceModal, setOpenSendingInvoiceModal] = useState(false);
  const [openNoOutstandingInvoices, setOpenNoOutstandingInvoices] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openPayErrorModal, setOpenPayErrorModal] = useState(false);
  const [openInsufficientFundsModal, setOpenInsufficientFundsModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);

  async function handleGetInvoice() {

    (document.activeElement as HTMLElement).blur();

    try {

      if (!form.isValid()) return;

      setOpenGettingInvoiceModal(true);

      const invoice = await TransactionApi.getInvoice(contract.id, form.value.nic);
      
      setOpenGettingInvoiceModal(false);
      setInvoice(invoice);
      setOpenInvoiceModal(true);

    } catch (err: any) {

      if (err.response.data === 'NO_OUTSTANDING_INVOICES') {
        setOpenGettingInvoiceModal(false);
        setOpenNoOutstandingInvoices(true);
        return;
      }

      setOpenGettingInvoiceModal(false);
      setOpenErrorModal(true);
    }
  }

  async function handlePayInvoice() {

    try {

      setOpenInvoiceModal(false);

      if (salesReport.balance < invoice!.amount) {
        setOpenInsufficientFundsModal(true);
        return;
      }

      setOpenSendingInvoiceModal(true);

      const transaction = await TransactionApi.payInvoice(contract.id, invoice!.nic, invoice!.amount);

      await Promise.allSettled([
        printInvoice(business, transaction),
        SalesReport.fetch(),
        Transactions.fetch(1, 25)
      ]);

      form.clear();
      
      setOpenSendingInvoiceModal(false);
      setOpenSuccessfulModal(true);
      setTransaction(transaction);

    } catch (err: any) {
      
      setOpenSendingInvoiceModal(false);
      setOpenPayErrorModal(true);
    }
  }

  if (!contract) {
    return <Redirect to='/'/>;
  }

  return (
    <Page
      className={style.page} 
      title={contract.type}
      animate={true}>
      <div className={style.product}>
        <Image
          className={style.productImage}
          src={contract.image} />
        <div className={style.productName}>
          {contract.name}
        </div>
      </div>
      <div className={style.form}>
        <TextField
          style={style.textField}
          formField={form.fields.nic}
          type='number'
          placeholder='NIC'
          autofocus={true}
          validators={[validators.required]}
          onEnter={handleGetInvoice}/>
        <OutlineButton
          style={style.button}
          text='Consultar factura'
          rightIcon='east'
          onClick={handleGetInvoice}/>
      </div>
      <InvoiceModal
        open={openInvoiceModal}
        invoice={invoice}
        onClose={() => setOpenInvoiceModal(false)}
        onAccept={handlePayInvoice}/>
      <LoadingModal
        open={openGettingInvoiceModal}
        title='Obteniendo datos de facturación'/>
      <LoadingModal
        open={openSendingInvoiceModal}
        title='Pagando factura'/>
      <InvoiceSuccessfulModal
        open={openSuccessfulModal}
        transaction={transaction}
        onClose={() => setOpenSuccessfulModal(false)}/>
      <ErrorModal
        open={openNoOutstandingInvoices}
        title='No tiene facturas pendientes'
        description='No se encontraron facturas pendientes de pago.'
        onClose={() => setOpenNoOutstandingInvoices(false)}/>
      <ErrorModal
        open={openErrorModal}
        title='Ocurrió un error'
        description='No se pudieron obtener los datos de facturación. Revise el número de contrato e intente de nuevo más tarde.'
        onClose={() => setOpenErrorModal(false)}/>
      <ErrorModal
        open={openInsufficientFundsModal}
        title='Balance insuficiente'
        description='No posee balance suficiente para realizar esta operación.'
        onClose={() => setOpenInsufficientFundsModal(false)}/>
      <ErrorModal
        open={openPayErrorModal}
        title='No se pudo realizar el pago'
        description='Ocurrió un error al realizar el pago. Inténtelo de nuevo más tarde.'
        onClose={() => setOpenPayErrorModal(false)}/>
    </Page>
  );
}
