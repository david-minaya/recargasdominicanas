import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@rmwc/circular-progress';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { IDataPlan, IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { formatCurrency, useForm, validators } from '@recargas-dominicanas/core/utils';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { DataPlanConfirmModal } from '../data-plan-confirm-modal/data-plan-confirm-modal.component';
import { DataPlanModal } from '../data-plan-modal/data-plan-modal.component';
import { ErrorModal } from '../error-modal/error-modal.component';
import { printDataPlan } from '../../utils/printDataPlan';
import { style } from './data-plan.module.css';

import {
  TextField,
  LoadingModal,
  Select,
  SelectOption,
  Icon
} from '@recargas-dominicanas/core/components';

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

export function DataPlan(props: Props) {

  const { product } = props;

  const businessStore = useBusiness();
  const salesReports = useSalesReport();
  const transactions = useTransactions();
  const business = businessStore.get();
  const [transaction, setTransaction] = useState<ITransaction>();
  const [dataPlans, setDataPlans] = useState<IDataPlan[]>();
  const [disableDataPlansSelect, setDisableDataPlansSelect] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);
  const [openOutstandingBalanceModal, setOpenOutstandingBalanceModal] = useState(false);
  const [openInsufficientFundsModal, setOpenInsufficientFundsModal] = useState(false);
  const [openUnknownErrorModal, setOpenUnknownErrorModal] = useState(false);
  
  const form = useForm({ 
    phone: '', 
    dataPlan: undefined as IDataPlan | undefined 
  });

  useEffect(() => {
    form.clear();
    setDataPlans(undefined);
    setDisableDataPlansSelect(true);
    setShowErrorMessage(false);
  }, [product.id]);

  async function handlePhoneChange(value: string) {

    form.fields.dataPlan?.clear();
    setDataPlans(undefined);
    setShowErrorMessage(false);
    setDisableDataPlansSelect(true);

    if (value.length >= 10) {
      try {
        setDisableDataPlansSelect(false);
        setDataPlans(await TransactionApi.getDataPlans(product.id, value));
      } catch (err) {
        form.fields.dataPlan?.clear();
        setDisableDataPlansSelect(true);
        setShowErrorMessage(true);
      }
    }
  }

  function handleConfirm() {
    if (form.isValid()) {
      setOpenConfirmModal(true);
    }
  }

  async function handleSend() {

    setOpenConfirmModal(false);
    setOpenLoadingModal(true);

    try {

      const transaction = await TransactionApi.sendDataPlan(
        product.id,
        form.value.phone,
        form.value.dataPlan!.id
      );

      salesReports.fetchCurrent();
      transactions.fetchGroupByDay(1, 50);
      
      setOpenLoadingModal(false);
      setTransaction(transaction);
      setOpenSuccessfulModal(true);

    } catch (err: any) {

      setOpenLoadingModal(false);

      if (err?.response?.data === 'INSUFFICIENT_FUNDS') return setOpenInsufficientFundsModal(true);
      if (err.response.data === 'OUTSTANDING_BALANCE') return setOpenOutstandingBalanceModal(true);

      setOpenUnknownErrorModal(true);
    }
  }

  function handleCloseSuccessfulModal() {
    setOpenSuccessfulModal(false);
    setTransaction(undefined);
    setDataPlans(undefined);
    setDisableDataPlansSelect(true);
    form.clear();
  }

  function handleCancel() {
    form.clear();
    setDataPlans(undefined);
    setDisableDataPlansSelect(true);
    setShowErrorMessage(false);
  }

  return (
    <ProductCard>
      <ProductCardTitle title='Paquetico'/>
      <ProductCardContent>
        <ProductCardInfo 
          product={product}/>
        <ProductCardFields>
          <TextField
            formField={form.fields.phone}
            type='tel'
            label='Teléfono'
            onChange={handlePhoneChange}
            validators={[
              validators.required, 
              validators.phone
            ]}/>
          <Select 
            style={style.select} 
            label='Plan de datos'
            required={true}
            disabled={disableDataPlansSelect}
            formField={form.fields.dataPlan}>
            {!dataPlans &&
              <CircularProgress
                className={style.circularProgress} 
                size={44}/>
            }
            {dataPlans?.map(plan =>
              <SelectOption
                key={plan.id}
                style={style.selectOption}
                value={plan}
                showClearIcon={false}
                label={plan.name}>
                <div className={style.dataPlanItem}>
                  <span>{plan.name}</span>
                  <span 
                    className={style.price}>
                    {formatCurrency(plan.price)}
                  </span>
                </div>
              </SelectOption>
            )}
          </Select>
        </ProductCardFields>
        {showErrorMessage &&
          <div className={style.dataPlansError}>
            <Icon className={style.dataPlansErrorIcon} icon='info'/>
            <div>
              <div className={style.dataPlansErrorTitle}>
                No se encontraron planes de datos
              </div>
              <div className={style.dataPlansErrorDescription}>
                Verifique el número de teléfono y la compañía e intentelo denuevo más tarde.
              </div>
            </div>
          </div>
        }
      </ProductCardContent>
      <ProductCardButtons
        onAccept={handleConfirm}
        onCancel={handleCancel}/>
      <DataPlanConfirmModal
        open={openConfirmModal}
        company={product.name}
        phone={form.value.phone}
        dataPlan={form.value.dataPlan}
        onAccept={handleSend}
        onClose={() => setOpenConfirmModal(false)}/>
      <LoadingModal
        title='Realizando operación' 
        open={openLoadingModal}/>
      <DataPlanModal
        open={openSuccessfulModal}
        title='Paquetico exitoso'
        dataPlan={form.value.dataPlan}
        transaction={transaction}
        onPrint={() => printDataPlan(business, transaction!, form.value.dataPlan)}
        onClose={handleCloseSuccessfulModal}/>
      <ErrorModal
        open={openInsufficientFundsModal}
        title='No posee suficiente balance'
        description='No posee suficiente balance para realizar esta operación.'
        onClose={() => setOpenInsufficientFundsModal(false)}/>
      <ErrorModal
        open={openOutstandingBalanceModal}
        title='Cliente con prestamo'
        description='No se puede realizar la operación hasta que el prestamo este pago. Intente con un monto mayor.'
        onClose={() => setOpenOutstandingBalanceModal(false)}/>
      <ErrorModal
        open={openUnknownErrorModal}
        title='Ocurrio un error'
        description='Intentelo denuevo más tarde.'
        onClose={() => setOpenUnknownErrorModal(false)}/>
    </ProductCard>
  );
}
