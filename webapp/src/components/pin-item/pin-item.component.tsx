import React, { Fragment, PropsWithChildren, memo, useState } from 'react';
import { useBusiness } from '@recargas-dominicanas/core/store';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionItem } from '@recargas-dominicanas/core/components';
import { PinModal } from '../pin-modal/pin-modal.component';
import { printPin } from '../../utils/printPin';
import { style } from './pin-item.module.css';

interface Props {
  transaction: ITransaction;
}

export const PinItem = memo(function PinItem(props: Props) {

  const { transaction } = props;
  const business = useBusiness().get();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <TransactionItem
        style={style.item}
        key={transaction.id}
        transaction={transaction}
        showMenu={false}
        onClick={() => setOpenModal(true)}/>
      <PinModal
        open={openModal}
        title='Pin'
        transaction={transaction}
        onPrint={() => printPin(business, transaction)}
        onClose={() => setOpenModal(false)}/>
    </Fragment>
  );
}, propsAreEqual);

function propsAreEqual(prev: PropsWithChildren<Props>, next: PropsWithChildren<Props>) {
  return (
    prev.transaction.id === next.transaction.id &&
    prev.transaction.cancelled === next.transaction.cancelled
  );
}
