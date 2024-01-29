import React, { useRef, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { BusinessUserApi } from '@recargas-dominicanas/core/api';
import { validators, formatCurrency, useForm } from '@recargas-dominicanas/core/utils';
import { useBusiness, useTransactions, useSalesReport } from '@recargas-dominicanas/core/store';
import { Page } from '../../components/page/page.component';
import { TopupConfirmModal } from '../../components/topup-confirm-modal/topup-confirm-modal.component';
import { TopupSuccessfulModal } from '../../components/topup-successful-modal/topup-successful-modal.component';
import { printTransaction } from '../../utils/printTransaction';
import { ErrorModal } from '../../components/error-modal/error-modal.component';
import { style } from './topup.module.css';

import { 
  Button, 
  Image, 
  LoadingModal, 
  OutlineButton,
  TextField
} from '@recargas-dominicanas/core/components';

interface Form {
  phone: string;
  amount: string;
}

export function Topup() {

  const business = useBusiness().get();
  const Transactions = useTransactions();
  const SalesReport = useSalesReport();
  const history = useHistory();
  const location = useLocation<IProduct>();
  const product = location.state;
  const form = useForm<Form>({ phone: '', amount: '' });
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [transaction, setTransaction] = useState<ITransaction>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openInvalidPhoneModal, setOpenInvalidPhoneModal] = useState(false);
  const [openInsufficientFundsModal, setOpenInsufficientFundsModal] = useState(false);
  const [openWrongCompanyModal, setOpenWrongCompanyModal] = useState(false);
  const [openDuplicatedModal, setOpenDuplicatedModal] = useState(false);
  const [openUnknownErrorModal, setOpenUnknownErrorModal] = useState(false);

  if (!product) {
    return <Redirect to='/'/>;
  }

  function handleClose() {
    history.goBack();
  }

  function handleAmountFieldClick() {
    buttonsRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function handleConfirmTransaction() {
    if (form.isValid()) {
      (document.activeElement as HTMLElement).blur();
      setOpenConfirmModal(true);
    }
  }

  async function handleSendTransaction() {

    setOpenConfirmModal(false);
    setOpenLoadingModal(true);

    try {

      const transaction = await BusinessUserApi.sendTransaction(
        product.id,
        form.value.phone,
        parseInt(form.value.amount)
      );
      
      await Promise.allSettled([
        printTransaction(business, transaction),
        SalesReport.fetch(),
        Transactions.fetch(1, 25)
      ]);

      form.clear();
      
      setOpenLoadingModal(false);
      setTransaction(transaction);
      setOpenSuccessModal(true);

    } catch (err: any) {

      setOpenLoadingModal(false);
      
      if (err.response.data === 'INVALID_PHONE') return setOpenInvalidPhoneModal(true);
      if (err.response.data === 'INSUFFICIENT_FUNDS') return setOpenInsufficientFundsModal(true);
      if (err.response.data === 'WRONG_COMPANY') return setOpenWrongCompanyModal(true);
      if (err.response.data === 'DUPLICATED') return setOpenDuplicatedModal(true);

      setOpenUnknownErrorModal(true);
    }
  }

  function handlePrint() {
    printTransaction(business, transaction!);
  }

  return (
    <Page
      className={style.page} 
      title='Recarga'
      animate={true}>
      <div className={style.product}>
        <Image
          className={style.productImage}
          src={product.image} />
        <div className={style.productName}>
          {product.name}
        </div>
      </div>
      <div className={style.textFields}>
        <TextField
          style={style.textField}
          formField={form.fields.phone}
          autofocus={true}
          type='tel'
          placeholder='Telefono'
          validators={[
            validators.required,
            validators.phone
          ]}/>
        <TextField
          style={style.textField}
          formField={form.fields.amount}
          type='number'
          placeholder='Monto'
          onClick={handleAmountFieldClick}
          onFocus={handleAmountFieldClick}
          onEnter={handleConfirmTransaction}
          hint={`
            min. ${formatCurrency(product.min)} - 
            máx. ${formatCurrency(product.max)}
          `}
          validators={[
            validators.required,
            validators.min(product.min),
            validators.max(product.max)
          ]}/>
      </div>
      <div 
        className={style.buttons}
        ref={buttonsRef}>
        <Button
          style={style.button}
          text='Cancelar'
          onClick={handleClose}/>
        <OutlineButton
          style={style.button}
          text='Realizar'
          onClick={handleConfirmTransaction}/>
      </div>
      <TopupConfirmModal
        open={openConfirmModal}
        phone={form.value.phone}
        amount={parseInt(form.value.amount)}
        onAccept={handleSendTransaction}
        onClose={() => setOpenConfirmModal(false)}/>
      <TopupSuccessfulModal
        open={openSuccessModal}
        transaction={transaction}
        onPrint={handlePrint}
        onClose={() => setOpenSuccessModal(false)}/>
      <LoadingModal
        open={openLoadingModal} 
        style={style.modal}
        title='Realizando recarga'/>
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
    </Page>
  );
}
