import React, { Fragment, useState } from 'react';
import { useBusiness } from '@recargas-dominicanas/core/store';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { DataPlanModal } from '../data-plan-modal/data-plan-modal.component';
import { printDataPlan } from '../../utils/printDataPlan';
import { TransactionRow } from '../transaction-row/transaction-row.component';

interface Props {
  transaction: ITransaction;
}

export function DataPlanRow(props: Props) {

  const { transaction } = props;
  const business = useBusiness().get();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <TransactionRow 
        key={transaction.id} 
        transaction={transaction}
        onClick={() => setOpenModal(true)}
        onPrint={() => printDataPlan(business, transaction, undefined)}/>
      <DataPlanModal
        open={openModal}
        title='Paquetico'
        transaction={transaction}
        onPrint={() => printDataPlan(business, transaction, undefined)}
        onClose={() => setOpenModal(false)}/>
    </Fragment>
  );
}
