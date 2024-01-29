import React, { Fragment, PropsWithChildren, memo, useState } from 'react';
import { useBusiness } from '@recargas-dominicanas/core/store';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { TransactionItem } from '@recargas-dominicanas/core/components';
import { DataPlanModal } from '../data-plan-modal/data-plan-modal.component';
import { printDataPlan } from '../../utils/printDataPlan';
import { style } from './data-plan-item.module.css';

interface Props {
  transaction: ITransaction;
}

export const DataPlanItem = memo(function DataPlanItem(props: Props) {

  const { transaction } = props;
  const business = useBusiness().get();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fragment>
      <TransactionItem
        style={style.item}
        key={transaction.id}
        showMenu={false}
        transaction={transaction}
        onClick={() => setOpenModal(true)}/>
      <DataPlanModal
        open={openModal}
        title='Paquetico'
        transaction={transaction}
        onPrint={() => printDataPlan(business, transaction, undefined)}
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
