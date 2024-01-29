import React, { useEffect, useState } from 'react';
import logo from '../../images/recargas-dominicanas.svg';
import serverErrorImage from '../../images/server-error.png';
import { Switch, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { BusinessApi } from '@recargas-dominicanas/core/api';
import { useOpenPopup } from '@recargas-dominicanas/core/hooks';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { UserProfile } from '../../components/user-profile/user-profile.component';
import { SalesReports } from '../sales-reports/sales-reports.component';
import { Transactions } from '../transactions/transactions.component';
import { Settings } from '../settings/settings.component';
import { Home } from '../home/home.component';
import { style } from './main.module.css';

import {
  useBusiness,
  useBusinessUsers,
  useSalesReport,
  useProducts,
  useTransactions
} from '@recargas-dominicanas/core/store';

import {  
  ErrorPage,
  Header, 
  Navbar,
  NavbarOption 
} from '@recargas-dominicanas/core/components';

export function Main() {

  const businessStore = useBusiness();
  const businessUserStore = useBusinessUsers();
  const salesReportStore = useSalesReport();
  const productsStore = useProducts();
  const transactionsStore = useTransactions();

  const business = businessStore.get();
  const businessUser = businessUserStore.get();
  const openProfile = useOpenPopup();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useAsyncEffect(async () => {

    try {

      await Promise.all([
        businessStore.fetch(),
        businessUserStore.fetch(),
        productsStore.fetch(),
        salesReportStore.fetchCurrent(),
        salesReportStore.fetchPage(1, 50),
        transactionsStore.fetchGroupByDay(1, 50),
        transactionsStore.fetchPage(1, 50)
      ]);

      setLoading(false);

    } catch {

      setLoading(false);
      setError(true);
    }
  });

  useEffect(() => {

    initializeApp({
      apiKey: 'AIzaSyC7eigLI0OSSO97gpsbPn8DliEBWMjQXL4',
      authDomain: 'recargas-dominicanas.firebaseapp.com',
      projectId: 'recargas-dominicanas',
      storageBucket: 'recargas-dominicanas.appspot.com',
      messagingSenderId: '554293903687',
      appId: '1:554293903687:web:78fe32a30569eb8e800c62',
      measurementId: 'G-RGG4LZNK07'
    });

    const messaging = getMessaging();

    getToken(messaging, { vapidKey: process.env.FIREBASE_MESSAGING_KEY }).then((token) => {
      if (token) {
        BusinessApi.addNotificationToken(token);
      } else {
        Notification.requestPermission();
      }
    });

    onMessage(messaging, payload => {
      if (payload.data?.type === 'BALANCE') {
        salesReportStore.fetchCurrent();
        alert(`Balance asignado: ${payload.data.balance}`);
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        salesReportStore.fetchCurrent();
      }
    });
  }, []);

  useEffect(() => {
    const ticketWidth = localStorage.getItem('ticketWidth');
    const endLines = localStorage.getItem('endLines');
    if (!ticketWidth) localStorage.setItem('ticketWidth', '40');
    if (!endLines) localStorage.setItem('endLines', '5');
  }, []);

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <ErrorPage 
        image={serverErrorImage}
        onClick={() => location.href = '/'}/>
    );
  }

  return (
    <div>
      <Header
        logo={logo}
        title='Recargas Dominicanas'
        name={`${businessUser.name}, ${business.name}`} 
        onOpenProfile={openProfile.handleOpen}/>
      <div className={style.body}>
        <Navbar style={style.navBar}>
          <NavbarOption align='top' icon='storefront' label='Inicio' route='/'/>
          <NavbarOption align='top' icon='history' label='Transacciones' route='/transacciones'/>
          <NavbarOption align='top' icon='receipt_long' label='Cierres de venta' route='/cierres-de-venta'/>
          <NavbarOption align='bottom' icon='settings' label='Configuración' route='/configuracion'/>
        </Navbar>
        <div className={style.content}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/transacciones' component={Transactions}/>
            <Route exact path='/cierres-de-venta' component={SalesReports}/>
            <Route exact path='/configuracion' component={Settings}/>
          </Switch>
        </div>
      </div>
      <UserProfile 
        open={openProfile.open}
        onClose={openProfile.handleClose}
        user={businessUser}
        business={business!}/>
    </div>
  );
}
