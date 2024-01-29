import React, { Fragment, useRef, useState } from 'react';
import { useOpenPopup } from '@recargas-dominicanas/core/hooks';
import { Icon, LoadingModal, Menu, Option } from '@recargas-dominicanas/core/components';
import { SalesReportModal } from '../sales-report-modal/sales-report-modal.component';
import { BusinessApi, BusinessUserApi } from '@recargas-dominicanas/core/api';
import { printSalesReport } from '../../utils/printSalesReport';
import { ErrorModal } from '../error-modal/error-modal.component';
import { TopupCancelModal } from '../topup-cancel-modal/topup-cancel-modal.component';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { printTransaction } from '../../utils/printTransaction';
import { ConfirmModal } from '../confirm-modal/confirm-modal.component';
import { style } from './header.module.css';

import {
  useBusiness,
  useBusinessUsers,
  useSalesReport,
  useProducts,
  useTransactions 
} from '@recargas-dominicanas/core/store';

interface Props {
  onClick?: () => void;
}

export function Header(props: Props) {

  const { onClick } = props;

  const Business = useBusiness();
  const BusinessUsers = useBusinessUsers();
  const SalesReport = useSalesReport();
  const Products = useProducts();
  const Transactions = useTransactions();
  const menuRef = useRef<HTMLDivElement>(null);
  const openMenu = useOpenPopup();
  const salesReport = SalesReport.get();
  const business = Business.get();
  const [lastTopup, setLastTopup] = useState<ITransaction>();
  const [openSalesReportModal, setOpenSalesReportModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openGetLastTopupErrorModal, setOpenGetLastTopupErrorModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);

  async function handleUpdate() {
    await Business.fetch();
    await BusinessUsers.fetch();
    await SalesReport.fetch();
    await Products.fetch();
    await Transactions.fetch(1, 25);
  }

  async function handleOpenSalesReportModal() {
    setOpenSalesReportModal(true);
    openMenu.handleClose();
  }

  async function handleSalesReport() {
    await BusinessApi.createSalesReport();
    await SalesReport.fetch();
    await printSalesReport(business, salesReport);
    setOpenSalesReportModal(false);
  }

  async function handleGetLastTopUp() {

    openMenu.handleClose();
    setOpenLoadingModal(true);

    try {

      const lastTopup = await BusinessUserApi.getLastTopup();

      setLastTopup(lastTopup);
      setOpenCancelModal(true);
      setOpenLoadingModal(false);

    } catch (err: any) {

      setOpenLoadingModal(false);
      setOpenGetLastTopupErrorModal(true);
    }
  }

  async function handleCancelTopup() {
    
    try {

      setOpenCancelModal(false);
      setOpenLoadingModal(true);

      await BusinessUserApi.cancelTransaction(lastTopup!.id);

      await Promise.allSettled([
        printTransaction(business, { ...lastTopup!, cancelled: true }),
        SalesReport.fetch(),
        Transactions.fetch(1, 25)
      ]);

      setOpenLoadingModal(false);
      setOpenSuccessfulModal(true);

    } catch(err: any) {

      setOpenLoadingModal(false);
      setOpenErrorModal(true);
    }
  }

  return (
    <Fragment>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <img
            className={style.logo} 
            src='/recargas-dominicanas-32x32.svg'
            onClick={onClick}/>
          <span 
            className={style.title}>
            Recargas Dominicanas
          </span>
        </div>
        <Icon 
          className={style.icon}
          icon='more_horiz'
          iconRef={menuRef}
          onClick={openMenu.handleOpen}/>
      </div>
      <Menu 
        open={openMenu.open}
        style={style.menu}
        anchor={menuRef}
        right={8}
        onClose={openMenu.handleClose}>
        <Option 
          style={style.option}
          icon='refresh' 
          text='Actualizar'
          onClick={handleUpdate}/>
        <Option 
          style={style.option}
          icon='point_of_sale' 
          text='Realizar cierre de ventas'
          onClick={handleOpenSalesReportModal}/>
        <Option 
          style={style.option}
          icon='cancel' 
          text='Cancelar última recarga'
          onClick={handleGetLastTopUp}/>
      </Menu>
      <SalesReportModal
        open={openSalesReportModal}
        salesReport={salesReport}
        onAccept={handleSalesReport}
        onClose={() => setOpenSalesReportModal(false)}/>
      <LoadingModal
        open={openLoadingModal}
        title='Cancelando recarga'/>
      <TopupCancelModal
        open={openCancelModal}
        overlayEnterAnimation={false}
        transaction={lastTopup}
        onAccept={handleCancelTopup}
        onClose={() => setOpenCancelModal(false)}/>
      <ConfirmModal
        open={openSuccessfulModal}
        title='Recarga cancelada'
        description='Recarga cancelada exitosamente.'
        onClose={() => setOpenSuccessfulModal(false)}/>
      <ErrorModal
        open={openGetLastTopupErrorModal}
        title='Ocurrio un error'
        description='No se puede cancelar la última recarga.'
        onClose={() => setOpenGetLastTopupErrorModal(false)}/>
      <ErrorModal
        open={openErrorModal}
        title='Ocurrio un error'
        description='No se pudo cancelar la recarga.'
        onClose={() => setOpenErrorModal(false)}/>
    </Fragment>
  );
}
