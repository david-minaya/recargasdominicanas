import React, { useEffect, useState } from 'react';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { TextField, LoadingModal } from '@recargas-dominicanas/core/components';
import { formatCurrency, useForm, validators } from '@recargas-dominicanas/core/utils';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { TopupConfirmModal } from '../topup-confirm-modal/topup-confirm-modal.component';
import { TopupModal } from '../topup-modal/topup-modal.component';
import { ErrorModal } from '../error-modal/error-modal.component';
import { printTopup } from '../../utils/printToup';
import { style } from './topup.module.css';

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

export function Topup(props: Props) {

  const { product } = props;

  const businessStore = useBusiness();
  const salesReports = useSalesReport();
  const transactions = useTransactions();
  const business = businessStore.get();
  const form = useForm({ phone: '', amount: '' });
  const [transaction, setTransaction] = useState<ITransaction>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);
  const [openInvalidPhoneModal, setOpenInvalidPhoneModal] = useState(false);
  const [openInsufficientFundsModal, setOpenInsufficientFundsModal] = useState(false);
  const [openWrongCompanyModal, setOpenWrongCompanyModal] = useState(false);
  const [openDuplicatedModal, setOpenDuplicatedModal] = useState(false);
  const [openUnknownErrorModal, setOpenUnknownErrorModal] = useState(false);

  useEffect(() => {
    form.clear();
  }, [product.id]);

  function handleConfirm() {
    if (form.isValid()) {
      setOpenConfirmModal(true);
    }
  }

  async function handleSend() {

    setOpenConfirmModal(false);
    setOpenLoadingModal(true);

    try {

      const transaction = await BusinessUserApi.sendTransaction(
        product.id,
        form.value.phone,
        parseInt(form.value.amount)
      );

      form.clear();
      salesReports.fetchCurrent();
      transactions.fetchGroupByDay(1, 50);
      
      setOpenLoadingModal(false);
      setTransaction(transaction);
      setOpenSuccessfulModal(true);

    } catch (err: any) {

      setOpenLoadingModal(false);
      
      if (err?.response?.data === 'INVALID_PHONE') return setOpenInvalidPhoneModal(true);
      if (err?.response?.data === 'INSUFFICIENT_FUNDS') return setOpenInsufficientFundsModal(true);
      if (err?.response?.data === 'WRONG_COMPANY') return setOpenWrongCompanyModal(true);
      if (err?.response?.data === 'DUPLICATED') return setOpenDuplicatedModal(true);

      setOpenUnknownErrorModal(true);
    }
  }

  return (
    <ProductCard>
      <ProductCardTitle title='Recarga'/>
      <ProductCardContent>
        <ProductCardInfo product={product}/>
        <ProductCardFields>
          <TextField
            formField={form.fields.phone}
            type='tel'
            label='Teléfono'
            validators={[
              validators.required, 
              validators.phone
            ]}/>
          <TextField
            style={style.amountTextField}
            formField={form.fields.amount}
            type='number'
            label='Monto'
            onEnter={handleConfirm}
            hint={`
              min. ${formatCurrency(product.min)} - 
              máx. ${formatCurrency(product.max)}
            `}
            validators={[
              validators.required,
              validators.min(product.min), 
              validators.max(product.max)
            ]}/>
        </ProductCardFields>
      </ProductCardContent>
      <ProductCardButtons
        onAccept={handleConfirm}
        onCancel={() => form.clear()}/>
      <TopupConfirmModal
        open={openConfirmModal}
        company={product.name}
        phone={form.value.phone}
        amount={parseInt(form.value.amount)}
        onAccept={handleSend}
        onClose={() => setOpenConfirmModal(false)}/>
      <LoadingModal
        title='Realizando operación' 
        open={openLoadingModal}/>
      <TopupModal
        open={openSuccessfulModal}
        title='Recarga exitosa'
        transaction={transaction!}
        onPrint={() => printTopup(business, transaction!)}
        onClose={() => setOpenSuccessfulModal(false)}/>
      <ErrorModal
        open={openInvalidPhoneModal}
        title='Número de teléfono invalido'
        description='Revice el número de teléfono e intentelo denuevo.'
        onClose={() => setOpenInvalidPhoneModal(false)}/>
      <ErrorModal
        open={openInsufficientFundsModal}
        title='No posee suficiente balance'
        description='No posee suficiente balance para realizar esta operación.'
        onClose={() => setOpenInsufficientFundsModal(false)}/>
      <ErrorModal
        open={openWrongCompanyModal}
        title='Compañía incorrecta'
        description='Este número de teléfono no pertenece a esta compañía, intente con otra compañía.'
        onClose={() => setOpenWrongCompanyModal(false)}/>
      <ErrorModal
        open={openDuplicatedModal}
        title='Recarga repetida'
        description='No se pueden realizar varias recarga a la vez a un mismo número. Vuelva a intentarlo despues de 5 minutos.'
        onClose={() => setOpenDuplicatedModal(false)}/>
      <ErrorModal
        open={openUnknownErrorModal}
        title='Ocurrio un error'
        description='Intentelo denuevo más tarde.'
        onClose={() => setOpenUnknownErrorModal(false)}/>
    </ProductCard>
  );
}
