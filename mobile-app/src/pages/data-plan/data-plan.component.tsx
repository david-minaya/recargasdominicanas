import React, { useRef, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { IDataPlan, IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { useForm, validators } from '@recargas-dominicanas/core/utils';
import { useBusiness, useTransactions, useSalesReport } from '@recargas-dominicanas/core/store';
import { Page } from '../../components/page/page.component';
import { DataPlansModal } from '../../components/data-plans-modal/data-plans-modal.component';
import { TopupConfirmModal } from '../../components/topup-confirm-modal/topup-confirm-modal.component';
import { TopupSuccessfulModal } from '../../components/topup-successful-modal/topup-successful-modal.component';
import { printTransaction } from '../../utils/printTransaction';
import { ErrorModal } from '../../components/error-modal/error-modal.component';
import { style } from './data-plan.module.css';

import {
  Image,
  LoadingModal,
  OutlineButton,
  TextField
} from '@recargas-dominicanas/core/components';

export function DataPlan() {

  const Business = useBusiness();
  const SalesReport = useSalesReport();
  const Transactions = useTransactions();
  const location = useLocation<IProduct>();
  const product = location.state;
  const business = Business.get();
  const salesReport = SalesReport.get();
  const formRef = useRef<HTMLDivElement>(null);
  const form = useForm({ phone: '' });
  const [dataPlan, setDataPlan] = useState<IDataPlan>();
  const [dataPlans, setDataPlans] = useState<IDataPlan[]>();
  const [transaction, setTransaction] = useState<ITransaction>();
  const [openGettingDataPlansModal, setOpenGettingDataPlansModal] = useState(false);
  const [openSendingDataPlanModal, setOpenSendingDataPlanModal] = useState(false);
  const [openDataPlansModal, setOpenDataPlansModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openNotFoundErrorModal, setOpenNotFoundErrorModal] = useState(false);
  const [openOutstandingBalanceModal, setOpenOutstandingBalanceModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openInsufficientFundsModal, setOpenInsufficientFundsModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);


  async function handleGetDataPlans() {

    (document.activeElement as HTMLElement).blur();

    try {

      if (!form.isValid()) return;

      setOpenGettingDataPlansModal(true);

      const dataPlans = await TransactionApi.getDataPlans(product.id, form.value.phone);
      
      setOpenGettingDataPlansModal(false);
      setDataPlans(dataPlans);
      setOpenDataPlansModal(true);

    } catch (err: any) {

      setOpenGettingDataPlansModal(false);
      setOpenNotFoundErrorModal(true);
    }
  }

  async function handleDataPlanClick(dataPlan: IDataPlan) {
    setOpenConfirmModal(true);
    setDataPlan(dataPlan);
  }

  async function handleSendDataPlan() {
    
    try {

      setOpenConfirmModal(false);

      if (salesReport.balance < dataPlan!.price) {
        setOpenInsufficientFundsModal(true);
        return;
      }

      setOpenSendingDataPlanModal(true);

      const transaction = await TransactionApi.sendDataPlan(
        product.id,
        form.value.phone,
        dataPlan!.id
      );

      await Promise.allSettled([
        printTransaction(business, transaction),
        SalesReport.fetch(),
        Transactions.fetch(1, 25)
      ]);

      form.clear();
      
      setOpenSendingDataPlanModal(false);
      setOpenSuccessfulModal(true);
      setTransaction(transaction);

    } catch (err: any) {
      
      setOpenSendingDataPlanModal(false);

      if (err.response.data === 'OUTSTANDING_BALANCE') {
        return setOpenOutstandingBalanceModal(true);
      }

      setOpenErrorModal(true);
    }
  }

  function handlePrint() {
    printTransaction(business, transaction!);
  }

  if (!product) {
    return <Redirect to='/'/>;
  }

  return (
    <Page
      className={style.page}
      title={product.type}
      animate={true}>
      <div className={style.product}>
        <Image
          className={style.productImage}
          src={product.image} />
        <div className={style.productName}>
          {product.name}
        </div>
      </div>
      <div 
        className={style.form}
        ref={formRef}>
        <TextField
          style={style.textField}
          formField={form.fields.phone}
          type='number'
          placeholder='Teléfono'
          autofocus={true}
          validators={[validators.required, validators.phone]}
          onEnter={handleGetDataPlans}/>
        <OutlineButton
          style={style.button}
          text='Consultar Planes de datos'
          rightIcon='east'
          onClick={handleGetDataPlans}/>
      </div>
      <LoadingModal
        open={openGettingDataPlansModal}
        title='Obteniendo planes de datos'/>
      <LoadingModal
        open={openSendingDataPlanModal}
        title='Realizando recarga de datos'/>
      <DataPlansModal
        open={openDataPlansModal}
        dataPlans={dataPlans}
        onClick={handleDataPlanClick}
        onClose={() => setOpenDataPlansModal(false)}/>
      <TopupConfirmModal
        open={openConfirmModal}
        overlayEnterAnimation={false}
        phone={form.value.phone}
        amount={dataPlan?.price || 0}
        onAccept={handleSendDataPlan}
        onClose={() => setOpenConfirmModal(false)}/>
      <TopupSuccessfulModal
        open={openSuccessfulModal}
        transaction={transaction}
        onPrint={handlePrint}
        onClose={() => setOpenSuccessfulModal(false)}/>
      <ErrorModal
        open={openNotFoundErrorModal}
        title='Ocurrió un error'
        description='No se encontraron planes de datos. Revise el número de teléfono e intentelo de nuevo más tarde.'
        onClose={() => setOpenNotFoundErrorModal(false)}/>
      <ErrorModal
        open={openInsufficientFundsModal}
        title='Balance insuficiente'
        description='No posee balance suficiente para realizar la operación.'
        onClose={() => setOpenInsufficientFundsModal(false)}/>
      <ErrorModal
        open={openOutstandingBalanceModal}
        title='Cliente con prestamo'
        description='No se puede realizar la operación hasta que el prestamo este pago. Intente con un monto mayor.'
        onClose={() => setOpenOutstandingBalanceModal(false)}/>
      <ErrorModal
        open={openErrorModal}
        title='Ocurrió un error'
        description='No se pudo realizar la operación.'
        onClose={() => setOpenErrorModal(false)}/>
    </Page>
  );
}
