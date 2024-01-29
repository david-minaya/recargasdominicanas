import React, { useEffect, useState } from 'react';
import { Invoice } from '@recargas-dominicanas/core/types';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { TextField, LoadingModal } from '@recargas-dominicanas/core/components';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { InvoiceConfirmModal } from '../invoice-confirm-modal/invoice-confirm-modal.component';
import { InvoiceModal } from '../invoice-modal/invoice-modal.component';
import { ErrorModal } from '../error-modal/error-modal.component';
import { printInvoice } from '../../utils/printInvoice';

import { 
  ProductCard, 
  ProductCardButtons, 
  ProductCardContent, 
  ProductCardFields, 
  ProductCardInfo, 
  ProductCardTitle 
} from '../product-card';

interface Props {
  product: IProduct;
}

export function Invoice(props: Props) {

  const { product } = props;

  const businessStore = useBusiness();
  const salesReports = useSalesReport();
  const transactions = useTransactions();
  const salesReport = salesReports.getCurrent();
  const business = businessStore.get();
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

  useEffect(() => {
    form.clear();
  }, [product.id]);

  async function handleGetInvoice() {

    (document.activeElement as HTMLElement).blur();

    try {

      if (!form.isValid()) return;

      setOpenGettingInvoiceModal(true);

      const invoice = await TransactionApi.getInvoice(product.id, form.value.nic);
      
      setOpenGettingInvoiceModal(false);
      setInvoice(invoice);
      setOpenInvoiceModal(true);

    } catch (err: any) {
      
      setOpenGettingInvoiceModal(false);

      if (err.response.data === 'NO_OUTSTANDING_INVOICES') {
        setOpenNoOutstandingInvoices(true);
      } else {
        setOpenErrorModal(true);
      }
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

      const transaction = await TransactionApi.payInvoice(product.id, invoice!.nic, invoice!.amount);

      salesReports.fetchCurrent(),
      transactions.fetchGroupByDay(1, 50);
      form.clear();
      
      setOpenSendingInvoiceModal(false);
      setOpenSuccessfulModal(true);
      setTransaction(transaction);

    } catch (err: any) {
      
      setOpenSendingInvoiceModal(false);
      setOpenPayErrorModal(true);
    }
  }

  return (
    <ProductCard>
      <ProductCardTitle title='Servicio'/>
      <ProductCardContent>
        <ProductCardInfo product={product}/>
        <ProductCardFields>
          <TextField
            formField={form.fields.nic}
            label='No. Contrato'
            validators={[validators.required]}
            onEnter={handleGetInvoice}/>
        </ProductCardFields>
      </ProductCardContent>
      <ProductCardButtons
        onAccept={handleGetInvoice}
        onCancel={() => form.clear()}/>
      <InvoiceConfirmModal
        open={openInvoiceModal}
        company={product.name}
        invoice={invoice}
        onClose={() => setOpenInvoiceModal(false)}
        onAccept={handlePayInvoice}/>
      <LoadingModal
        open={openGettingInvoiceModal}
        title='Obteniendo datos de facturación'/>
      <LoadingModal
        open={openSendingInvoiceModal}
        title='Realizando pago'/>
      <InvoiceModal
        open={openSuccessfulModal}
        title='Pago realizado'
        transaction={transaction}
        onPrint={() => printInvoice(business, transaction!)}
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
    </ProductCard>
  );
}
