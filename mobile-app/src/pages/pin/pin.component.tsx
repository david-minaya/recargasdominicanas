import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { IBusiness, IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { formatCurrency, useForm } from '@recargas-dominicanas/core/utils';
import { useBusiness, useTransactions, useSalesReport } from '@recargas-dominicanas/core/store';
import { printPin } from '../../utils/printPin';
import { Select } from '../../components/select/select.component';
import { PriceModal } from '../../components/price-modal/price-modal.component';
import { QuantityModal } from '../../components/quantity-modal/quantity-modal.component';
import { PinConfirmModal } from '../../components/pin-confirm-modal/pin-confirm-modal.component';
import { PinProgressModal } from '../../components/pin-progress-modal/pin-progress-modal.component';
import { PinSuccessfulModal } from '../../components/pin-successful-modal/pin-successful-modal.component';
import { ErrorModal } from '../../components/error-modal/error-modal.component';
import { Page } from '../../components/page/page.component';
import { style } from './pin.module.css';

import { 
  Button,
  Image,
  OutlineButton,
  Toast
} from '@recargas-dominicanas/core/components';

interface Form {
  quantity: number;
  price?: number;
}

export function Pin() {

  const Business = useBusiness();
  const Transactions = useTransactions();
  const SalesReport = useSalesReport();
  const history = useHistory();
  const location = useLocation<IProduct>();
  const pin = location.state;
  const business = Business.get();
  const form = useForm<Form>({ quantity: 1, price: undefined });
  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openProgressModal, setOpenProgressModal] = useState(false);
  const [openInsufficientFundsModal, setOpenInsufficientFundsModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [priceError, setPriceError] = useState<string>();
  const [progress, setProgress] = useState(0);

  if (!pin) {
    return <Redirect to='/'/>;
  }

  function handleClose() {
    history.goBack();
  }

  function handleConfirmTransaction() {

    if (!form.value.price) {
      setPriceError('Seleccione el precio del pin');
      return;
    }

    setOpenConfirmModal(true);
  }

  async function handleSendTransaction() {

    setOpenConfirmModal(false);
    setOpenProgressModal(true);

    try {

      for (let i = 1; i <= form.value.quantity; i++) {
        setProgress(i);
        const transaction = await TransactionApi.sendPin(pin.id, form.value.price!);
        await print(business, transaction);
      }
    
      setOpenProgressModal(false);
      setOpenSuccessfulModal(true);

    } catch (err: any) {

      setOpenProgressModal(false);

      if (err.response.data === 'INSUFFICIENT_FUNDS') {
        setOpenInsufficientFundsModal(true);
      } else {
        setOpenErrorModal(true);
      }
    }

    await Promise.allSettled([
      SalesReport.fetch(),
      Transactions.fetch(1, 25)
    ]);
  }

  function handleCloseSuccessfulModal() {
    setOpenSuccessfulModal(false);
    form.clear();
  }

  function handleCloseInsufficentErrorModal() {
    form.clear();
    setOpenInsufficientFundsModal(false);
  }

  function handleCloseErrorModal() {
    form.clear();
    setOpenErrorModal(false);
  }

  async function print(business: IBusiness, transaction: ITransaction) {
    try {
      await printPin(business, transaction);
    } catch (err) {
      setOpenErrorToast(true);
    }
  }

  return (
    <Page
      className={style.page}
      title={pin.type}
      animate={true}>
      <div className={style.product}>
        <Image
          className={style.productImage}
          src={pin.image} />
        <div className={style.productName}>
          {pin.name}
        </div>
      </div>
      <div className={style.textFields}>
        <Select
          className={style.selectQuantity}
          title='Cantidad'
          value={form.value.quantity}
          onClick={() => setOpenQuantityModal(true)}/>
        <Select
          className={style.selectPrice}
          title='Precio'
          placeholder='Seleccionar'
          value={form.value.price ? formatCurrency(form.value.price) : undefined}
          error={priceError}
          onClick={() => {
            setOpenPriceModal(true);
            setPriceError(undefined);
          }}/>
      </div>
      <div className={style.buttons}>
        <Button
          style={style.button}
          text='Cancelar'
          onClick={handleClose}/>
        <OutlineButton
          style={style.button}
          text='Realizar'
          onClick={handleConfirmTransaction}/>
      </div>
      <QuantityModal
        open={openQuantityModal}
        quantities={[1, 2, 3, 4, 5, 10]}
        onClick={value => form.fields.quantity.updateValue(value)}
        onClose={() => setOpenQuantityModal(false)}/>
      <PriceModal
        open={openPriceModal}
        prices={pin.prices}
        onClick={value => form.fields.price?.updateValue(value)}
        onClose={() => setOpenPriceModal(false)}/>
      <PinConfirmModal
        open={openConfirmModal}
        price={form.value.price!}
        quantity={form.value.quantity}
        onAccept={handleSendTransaction}
        onClose={() => setOpenConfirmModal(false)} />
      <PinProgressModal
        style={style.modal}
        open={openProgressModal} 
        title='Realizando operación'
        progress={progress}
        quantity={form.value.quantity}/>
      <PinSuccessfulModal
        open={openSuccessfulModal}
        price={form.value.price!}
        quantity={form.value.quantity}
        onClose={handleCloseSuccessfulModal}/>
      <ErrorModal
        open={openInsufficientFundsModal}
        title='No posee suficiente balance'
        onClose={handleCloseInsufficentErrorModal}
        description={form.value.quantity === 1 
          ? 'No posee suficiente balance para realizar esta operación.'
          : `No posee suficiente balance para realizar esta operación. Se vendieron ${progress - 1} de ${form.value.quantity} pines.`
        }/>
      <ErrorModal
        open={openErrorModal}
        title='Ocurrio un error'
        onClose={handleCloseErrorModal}
        description={form.value.quantity === 1 
          ? 'No se pudo completar la operación.'
          : `No se pudo completar la operación. Se vendieron ${progress - 1} de ${form.value.quantity} pines.`
        }/>
      <Toast
        show={openErrorToast}
        text='Error imprimiendo ticket'
        onClose={() => setOpenErrorToast(false)}/>
    </Page>
  );
}
