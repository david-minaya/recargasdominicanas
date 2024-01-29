import React, { Fragment, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { IAppRelease } from '@recargas-dominicanas/core/types';
import { BusinessApi, AppReleaseApi } from '@recargas-dominicanas/core/api';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { PushNotification } from '../../plugins/pushNotification';
import { Drawer } from '../../components/drawer/drawer.component';
import { Home } from '../home/home.component';
import { Transactions } from '../transactions/transactions.component';
import { Settings } from '../settings/settings.component';
import { Topup } from '../topup/topup.component';
import { DataPlan } from '../data-plan/data-plan.component';
import { Pin } from '../pin/pin.component';
import { Invoice } from '../invoice/invoice.component';
import { TopupDetails } from '../topup-details/topup-details.component';
import { DataPlanDetails } from '../data-plan-details/data-plan-details.component';
import { UpdatePlugin } from '../../plugins/UpdatePlugin';
import { UpdateAppModal } from '../../components/update-app-modal/update-app-modal.component';
import { DownloadUpdateModal } from '../../components/download-update-modal/download-update-modal.component';
import { ConfirmModal } from '../../components/confirm-modal/confirm-modal.component';
import { InvoiceDetails } from '../invoice-details/invoice-details.component';
import { SplashScreen } from '../../components/splash-screen/splash-screen.component';
import { PinDetails } from '../pin-details/pin-details.component';

import {
  useBusiness,
  useBusinessUsers,
  useSalesReport,
  useProducts,
  useTransactions 
} from '@recargas-dominicanas/core/store';

export function Main() {

  const Business = useBusiness();
  const BusinessUsers = useBusinessUsers();
  const SalesReport = useSalesReport();
  const Products = useProducts();
  const transactionStore = useTransactions();
  const [isLoading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [openUpdateAppModal, setOpenUpdateAppModal] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [openDownloadFailedModal, setOpenDownloadFailedModal] = useState(false);
  const [appRelease, setAppRelease] = useState<IAppRelease>();

  useAsyncEffect(async () => {

    await fetchData();
    await updateNotificationToken();
    await checkAppUpdate();

    listenNewToken();
    listenNewNotification();
  });

  async function fetchData() {

    try {

      await Promise.all([
        Business.fetch(),
        BusinessUsers.fetch(),
        SalesReport.fetch(),
        Products.fetch(),
        transactionStore.fetch(1, 25)
      ]);
      
    } catch (err: any) {

      setLoadingError(true);

      console.error('Error fetching data: ', err);
    }

    setLoading(false);
  }

  async function updateNotificationToken() {

    try {
    
      const token = await PushNotification.getCurrentToken();
      await BusinessApi.addNotificationToken(token);
    
    } catch (err: any) {
    
      console.error('Error updating notification token: ', err);
    }
  }

  async function checkAppUpdate() {

    if (process.env.AUTO_UPDATE !== 'true') return;

    try {

      const appRelease = await AppReleaseApi.getCurrent();
      const version = await UpdatePlugin.getCurrentVersion();

      const update = appRelease.appVersion.version.localeCompare(
        version, 
        undefined, 
        { numeric: true , sensitivity: 'base' }
      );
    
      if (update > 0) {
        setAppRelease(appRelease);
        setOpenUpdateAppModal(true);
      }

    } catch (err: any) {

      console.error('Error get app update info: ', err);
    }
  }

  function listenNewToken() {
    PushNotification.onNewToken(async ({ token }) => {
      await BusinessApi.addNotificationToken(token);
    });
  }

  function listenNewNotification() {
    PushNotification.onNewNotification(async () => {
      await SalesReport.fetch();
    });
  }

  function handleOpenDrawer() {
    setOpenDrawer(true);
  }

  function handleOpenDownloadModal() {
    setOpenUpdateAppModal(false);
    setOpenDownloadModal(true);
  }

  if (isLoading) return <SplashScreen/>;
  
  if (loadingError) return <Redirect to='/error'/>;

  return (
    <Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}/>
      <Switch>
        <Route exact path='/'>
          <Home onOpenDrawer={handleOpenDrawer}/>
        </Route>
        <Route exact path='/transactions'>
          <Transactions onOpenDrawer={handleOpenDrawer}/>
        </Route>
        <Route exact path='/topup'>
          <Topup/>
        </Route>
        <Route exact path='/topup-details/:id'>
          <TopupDetails/>
        </Route>
        <Route exact path='/data-plan'>
          <DataPlan/>
        </Route>
        <Route exact path='/data-plan-details/:id'>
          <DataPlanDetails/>
        </Route>
        <Route exact path='/pin'>
          <Pin/>
        </Route>
        <Route exact path='/pin-details/:id'>
          <PinDetails/>
        </Route>
        <Route exact path='/invoice'>
          <Invoice/>
        </Route>
        <Route exact path='/invoice-details/:id'>
          <InvoiceDetails/>
        </Route>
        <Route exact path='/settings'>
          <Settings/>
        </Route>
      </Switch>
      <UpdateAppModal 
        open={openUpdateAppModal}
        appRelease={appRelease!}
        onDownloadUpdate={handleOpenDownloadModal}/>
      <DownloadUpdateModal
        open={openDownloadModal}
        onDownloadFailed={() => setOpenDownloadFailedModal(true)}
        onClose={() => setOpenDownloadModal(false)}/>
      <ConfirmModal
        open={openDownloadFailedModal}
        title='Descarga fallida'
        description='No se pudo descargar la actualización, inténtelo denuevo más tarde.'
        onClose={() => setOpenDownloadFailedModal(false)}/>
    </Fragment>
  );
}
