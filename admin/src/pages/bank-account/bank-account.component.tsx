import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { BankAccountStore } from '../../store/bankAccountStore';
import { Deposits } from './deposits/deposits.component';
import { Withdrawals } from './withdrawals/withdrawals.component';
import { DropDownButton } from '../../components/drop-down-button/drop-down-button.component';
import { DropDownOption } from '../../components/drop-down-option/drop-down-option.component';
import { RegisterDepositModal } from './register-deposit-modal/register-deposit-modal.component';
import { RegisterTransferModal } from './register-transfer-modal/register-transfer-modal.component';
import { RegisterWithdrawalModal } from './register-withdrawal-modal/register-withdrawal-modal.component';
import { RegisterProfitWithdrawalModal } from './register-profit-withdrawal-modal/register-profit-withdrawal-modal.component';
import { RegisterBalancePurchaseModal } from './register-balance-purchase-modal/register-balance-purchase-modal.component';
import { style } from './bank-account.module.css';

import {
  OutlineCard,
  ToolbarTitle,
  Text,
  PageContainer,
  PageToolbar,
  PageContent,
  TabBar,
  Tab,
  Switch,
  Case,
  DetailItem,
} from '@recargas-dominicanas/core/components';

export function BankAccount() {

  const params = useParams<{ id: string }>();
  const bankAccountId = parseInt(params.id);
  const bankAccount = BankAccountStore.getById(bankAccountId);
  const [selectedTab, setSelectedTab] = useState('deposits');
  const [openRegisterDeposit, setOpenRegisterDeposit] = useState(false);
  const [openRegisterTransferModal, setOpenRegisterTransferModal] = useState(false);
  const [openRegisterBalancePurchaseModal, setOpenRegisterBalancePurchaseModal] = useState(false);
  const [openRegisterWithdrawalModal, setOpenRegisterWithdrawalModal] = useState(false);
  const [openRegisterProfitWithdrawalModal, setOpenRegisterProfitWithdrawalModal] = useState(false);

  useEffect(() => {
    BankAccountStore.fetchById(bankAccountId);
    BankAccountStore.fetchDeposits(bankAccountId, 1, 100);
    BankAccountStore.fetchWithdrawals(bankAccountId, 1, 100);
  }, [bankAccountId]);

  return !bankAccount ? null : (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <ToolbarTitle 
          style={style.title}
          title='Cuenta bancaria'/>
        <div className={style.toolbarRight}>
          <TabBar onTabClick={tab => setSelectedTab(tab.tag)}>
            <Tab style={style.tab} tag='deposits' title='Depositos'/>
            <Tab style={style.tab} tag='withdrawals' title='Retiros'/>
          </TabBar>
          <DropDownButton
            icon='payments'
            title='Registrar deposito'
            onClick={() => setOpenRegisterDeposit(true)}>
            <DropDownOption title='Registrar transferencia' onClick={() => setOpenRegisterTransferModal(true)}/>
            <DropDownOption title='Registrar compra de balance' onClick={() => setOpenRegisterBalancePurchaseModal(true)}/>
            <DropDownOption title='Registrar retiro' onClick={() => setOpenRegisterWithdrawalModal(true)}/>
            <DropDownOption title='Registrar retiro de beneficio' onClick={() => setOpenRegisterProfitWithdrawalModal(true)}/>
          </DropDownButton>
        </div>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineCard className={style.outlineCard}>
          <img 
            className={style.image} 
            src={`${process.env.API}/image/${bankAccount.bank.image}`}/>
          <Text 
            className={style.bankAccountTitle} 
            text={bankAccount.name}/>
          <DetailItem 
            style={style.detailItem} 
            title='Cuenta' 
            text={bankAccount.accountNumber}/>
          <DetailItem 
            style={style.detailItem} 
            title='Balance'
            color='green'
            text={formatCurrency(bankAccount.balance)}/>
        </OutlineCard>
        <OutlineCard className={style.outlineCardRight}>
          <Switch caseId={selectedTab}>
            <Case caseId='deposits'><Deposits id={bankAccountId}/></Case>
            <Case caseId='withdrawals'><Withdrawals id={bankAccountId}/></Case>
          </Switch>
        </OutlineCard>
      </PageContent>
      <RegisterDepositModal
        open={openRegisterDeposit}
        bankAccountId={bankAccountId}
        onClose={() => setOpenRegisterDeposit(false)}/>
      <RegisterTransferModal
        open={openRegisterTransferModal}
        bankAccountId={bankAccountId}
        balance={bankAccount.balance}
        onClose={() => setOpenRegisterTransferModal(false)}/>
      <RegisterBalancePurchaseModal
        open={openRegisterBalancePurchaseModal}
        bankAccountId={bankAccountId}
        balance={bankAccount.balance}
        onClose={() => setOpenRegisterBalancePurchaseModal(false)}/>
      <RegisterWithdrawalModal
        open={openRegisterWithdrawalModal}
        bankAccountId={bankAccountId}
        balance={bankAccount.balance}
        onClose={() => setOpenRegisterWithdrawalModal(false)}/>
      <RegisterProfitWithdrawalModal
        open={openRegisterProfitWithdrawalModal}
        bankAccountId={bankAccountId}
        balance={bankAccount.balance}
        onClose={() => setOpenRegisterProfitWithdrawalModal(false)}/>
    </PageContainer>
  );
}
