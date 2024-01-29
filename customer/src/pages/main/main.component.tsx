import React, { useState } from 'react';
import logo from '../../images/recargas-dominicanas.svg';
import errorImage from '../../images/server-error.png';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { useOpenPopup } from '@recargas-dominicanas/core/hooks';
import { CustomerStore } from '../../store/customerStore';
import { BusinessStore } from '../../store/businessStore';
import { Home } from '../home/home.component';
import { UserProfile } from '../../components/user-profile/user-profile.component';
import { Business } from '../business/business.component';
import { ErrorPage, Header } from '@recargas-dominicanas/core/components';
import { style } from './main.module.css';

export function Main() {

  const customer = CustomerStore.get();
  const openProfile = useOpenPopup();
  const [isLoading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed]= useState(false);

  useAsyncEffect(async () => {

    try {

      await Promise.all([
        CustomerStore.fetch(),
        BusinessStore.fetchAll(),
      ]);
      
      setLoading(false);

    } catch (err: any) {

      setLoadFailed(true);
    }
  });

  if (isLoading || !customer) {
    return null;
  }

  if (customer.tempPassword) {
    return <Redirect to='/reset-password'/>;
  }

  if (loadFailed) {
    return <ErrorPage image={errorImage}/>;
  }

  return (
    <div>
      <Header
        logo={logo}
        title='Recargas Dominicanas'
        name={customer.name} 
        onOpenProfile={openProfile.handleOpen}/>
      <div className={style.body}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/customer/:id' component={Business}/>
        </Switch>
      </div>
      <UserProfile 
        open={openProfile.open}
        customer={customer}
        onClose={openProfile.handleClose}/>
    </div>
  );
}
