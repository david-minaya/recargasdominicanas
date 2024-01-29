import React, { useState } from 'react';
import logo from '../../images/recargas-dominicanas.svg';
import errorImage from '../../images/server-error.png';
import { Switch, Route } from 'react-router-dom';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { useOpenPopup } from '@recargas-dominicanas/core/hooks';
import { AdminStore } from '../../store/adminStore';
import { ProductStore } from '../../store/productStore';
import { BusinessStore } from '../../store/businessStore';
import { BankStore } from '../../store/bankStore';
import { BankAccountStore } from '../../store/bankAccountStore';
import { ProviderStore } from '../../store/providerStore';
import { AppReleaseStore } from '../../store/appReleaseStore';
import { FinanceStore } from '../../store/financeStore';
import { Home } from '../home/home.component';
import { UserProfile } from '../../components/user-profile/user-profile.component';
import { CreatedCustomer } from '../created-customer/created-customer.component';
import { Customer } from '../customer/customer.component';
import { Products } from '../products/products.component';
import { Providers } from '../providers/providers.component';
import { Provider } from '../provider/provider.component';
import { BankAccounts } from '../bank-accounts/bank-accounts.components';
import { BankAccount } from '../bank-account/bank-account.component';
import { Banks } from '../banks/banks.component';
import { Bank } from '../bank/bank.component';
import { AppReleases } from '../app-releases/app-releases.component';
import { Finances } from '../finances/finances.component';
import { style } from './main.module.css';

import { 
  ErrorPage,
  Header, 
  Navbar,
  NavbarOption
} from '@recargas-dominicanas/core/components';

export function Main() {

  const admin = AdminStore.get();
  const openProfile = useOpenPopup();
  const [isLoading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed]= useState(false);

  useAsyncEffect(async () => {

    try {

      await Promise.all([
        AdminStore.fetch(),
        BankStore.fetchAll(),
        ProductStore.fetchAll(),
        BusinessStore.fetchAll(),
        ProviderStore.fetchAll(),
        BankAccountStore.fetchAll(),
        AppReleaseStore.fetchAll(),
        FinanceStore.fetch()
      ]);
      
      setLoading(false);

    } catch (err: any) {

      setLoadFailed(true);
    }
  });

  if (isLoading) {
    return null;
  }

  if (loadFailed) {
    return <ErrorPage image={errorImage}/>;
  }

  return (
    <div>
      <Header
        logo={logo}
        title='Admin Recargas Dominicanas'
        name={`${admin.name}, Administrador`} 
        onOpenProfile={openProfile.handleOpen}/>
      <div className={style.body}>
        <Navbar style={style.navBar}>
          <NavbarOption align='top' icon='groups' route='/'/>
          <NavbarOption align='top' icon='account_balance' route='/bank-accounts'/>
          <NavbarOption align='top' icon='inventory_2' route='/products'/>
          <NavbarOption align='top' icon='widgets' route='/providers'/>
          <NavbarOption align='top' icon='donut_large' route='/finances'/>
          <NavbarOption align='top' icon='rocket_launch' route='/app-releases'/>
          <NavbarOption align='bottom' icon='settings' route='/settings'/>
        </Navbar>
        <div className={style.content}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/customer/:id' component={Customer}/>
            <Route exact path='/created-customer' component={CreatedCustomer}/>
            <Route exact path='/products' component={Products}/>
            <Route exact path='/bank-accounts' component={BankAccounts}/>
            <Route exact path='/bank-account/:id' component={BankAccount}/>
            <Route exact path='/banks' component={Banks}/>
            <Route exact path='/bank/:id' component={Bank}/>
            <Route exact path='/providers' component={Providers}/>
            <Route exact path='/provider/:id' component={Provider}/>
            <Route exact path='/finances' component={Finances}/>
            <Route exact path='/app-releases' component={AppReleases}/>
            <Route exact path='/settings'>Settings</Route>
          </Switch>
        </div>
      </div>
      <UserProfile 
        open={openProfile.open}
        admin={admin}
        onClose={openProfile.handleClose}/>
    </div>
  );
}
