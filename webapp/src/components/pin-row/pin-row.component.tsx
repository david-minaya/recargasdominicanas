import React, { Fragment, useState } from 'react';
import { useBusiness } from '@recargas-dominicanas/core/store';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionRow } from '../transaction-row/transaction-row.component';
import { PinModal } from '../pin-modal/pin-modal.component';
import { printPin } from '../../utils/printPin';

interface Props {
  transaction: ITransaction;
}

export function PinRow(props: Props) {

  const { transaction } = props;
  const business = useBusiness().get();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <TransactionRow 
        key={transaction.id} 
        transaction={transaction}
        onClick={() => setOpenModal(true)}
        onPrint={() => printPin(business, transaction)}/>
      <PinModal
        open={openModal}
        title='Pin'
        transaction={transaction}
        onPrint={() => printPin(business, transaction)}
        onClose={() => setOpenModal(false)}/>
    </Fragment>
  );
}
