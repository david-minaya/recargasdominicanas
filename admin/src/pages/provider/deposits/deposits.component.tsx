import React, { useEffect, useState } from 'react';
import { formatCurrency, formatDate } from '@recargas-dominicanas/core/utils';
import { ProviderStore } from '../../../store/providerStore';
import { RegisterDepositModal } from './register-deposit-modal/register-deposit-modal.component';
import { style } from './deposits.module.css';

import { 
  Table, 
  TableHeader, 
  OutlineButton, 
  TableRow, 
  CellImage, 
  Cell 
} from '@recargas-dominicanas/core/components';

interface Props {
  id: number;
}

export function Deposits(props: Props) {

  const { id } = props;

  const deposits = ProviderStore.getDeposits(id);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useEffect(() => {
    ProviderStore.fetchDeposits(id);
  }, []);

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <span>Banco</span>
          <span>Balance</span>
          <span>Fecha</span>
          <span>Descripción</span>
          <OutlineButton 
            style={style.addButton} 
            text='Registrar deposito'
            onClick={() => setOpenRegisterModal(true)}/>
        </TableHeader>
        <tbody>
          {
            deposits?.map(deposit => (
              <TableRow key={deposit.id}>
                <CellImage src={deposit.bankAccount.bank.image}/>
                <Cell weight='medium' color='green' text={formatCurrency(deposit.balance.amount)}/>
                <Cell text={formatDate(deposit.date)}/>
                <Cell className={style.description} text={deposit.reference}/>
                <Cell text=''/>
              </TableRow>
            ))
          }
        </tbody>
      </Table>
      <RegisterDepositModal
        open={openRegisterModal}
        id={id}
        onClose={() => setOpenRegisterModal(false)}/>
    </div>
  );
}
