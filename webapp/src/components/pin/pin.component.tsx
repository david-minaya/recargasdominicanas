import React, { useEffect, useState } from 'react';
import { TransactionApi } from '@recargas-dominicanas/core/api';
import { IProduct, ITransaction } from '@recargas-dominicanas/core/types';
import { formatCurrency, useForm } from '@recargas-dominicanas/core/utils';
import { Select, SelectOption, LoadingModal } from '@recargas-dominicanas/core/components';
import { useBusiness, useSalesReport, useTransactions } from '@recargas-dominicanas/core/store';
import { PinConfirmModal } from '../pin-confirm-modal/pin-confirm-modal.component';
import { ErrorModal } from '../error-modal/error-modal.component';
import { PinModal } from '../pin-modal/pin-modal.component';
import { printPin } from '../../utils/printPin';
import { style } from './pin.module.css';

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

export function Pin(props: Props) {

  const { product } = props;

  const businessStore = useBusiness();
  const salesReports = useSalesReport();
  const transactions = useTransactions();
  const business = businessStore.get();
  const form = useForm({ price: undefined as number | undefined });
  const [transaction, setTransaction] = useState<ITransaction>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);
  const [openInsufficientFundsModal, setOpenInsufficientFundsModal] = useState(false);
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

    try {

      setOpenConfirmModal(false);
      setOpenLoadingModal(true);

      const transaction = await TransactionApi.sendPin(product.id, form.value.price!);

      setTransaction(transaction);
      setOpenLoadingModal(false);
      setOpenSuccessfulModal(true);

    } catch (err: any) {

      setOpenLoadingModal(false);

      if (err.response.data === 'INSUFFICIENT_FUNDS') {
        return setOpenInsufficientFundsModal(true);
      }

      setOpenUnknownErrorModal(true);
    }

    salesReports.fetchCurrent();
    transactions.fetchGroupByDay(1, 50);
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
    setOpenUnknownErrorModal(false);
  }

  return (
    <ProductCard>
      <ProductCardTitle title='Pin'/>
      <ProductCardContent>
        <ProductCardInfo product={product}/>
        <ProductCardFields>
          <Select 
            style={style.select} 
            label='Precio'
            required={true}
            formField={form.fields.price}>
            {product.prices.map(price => 
              <SelectOption
                key={price.id} 
                style={style.option} 
                value={price.price} 
                showClearIcon={false} 
                label={formatCurrency(price.price)}>
                {formatCurrency(price.price)}
              </SelectOption>
            )}
          </Select>
        </ProductCardFields>
      </ProductCardContent>
      <ProductCardButtons
        onAccept={handleConfirm}
        onCancel={() => form.clear()}/>
      <PinConfirmModal
        open={openConfirmModal}
        company={product.name}
        price={form.value.price || 0}
        onAccept={handleSend}
        onClose={() => setOpenConfirmModal(false)}/>
      <LoadingModal
        title='Realizando operación' 
        open={openLoadingModal}/>
      <PinModal
        open={openSuccessfulModal}
        title='Pin exitoso'
        transaction={transaction}
        onPrint={() => printPin(business, transaction!)}
        onClose={handleCloseSuccessfulModal}/>
      <ErrorModal
        open={openInsufficientFundsModal}
        title='No posee suficiente balance'
        onClose={handleCloseInsufficentErrorModal}
        description='No posee suficiente balance para realizar esta operación.'/>
      <ErrorModal
        open={openUnknownErrorModal}
        title='Ocurrio un error'
        onClose={handleCloseErrorModal}
        description='No se pudo completar la operación.'/>
    </ProductCard>
  );
}
