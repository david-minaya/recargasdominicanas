import React, { Fragment, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { Drawer } from '../../components/drawer/drawer.component';
import { useFetchAdmin } from '../../store/admin.slice';
import { AddBusiness } from '../add-business/add-business.component';
import { AddDeposit } from '../add-deposit/add-deposit.component';
import { AddedBusiness } from '../added-business/added-business.component';
import { Business } from '../business/business.component';
import { Deposit } from '../deposit/deposit.component';
import { Deposits } from '../deposits/deposits.component';
import { Home } from '../home/home.component';

export function Main() {

  const history = useHistory();
  const fetchAdmin = useFetchAdmin();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useAsyncEffect(async () => {

    try {

      await fetchAdmin();
      setLoading(false);

    } catch(err: any) {

      history.replace('/error');
    }
  });

  function handleOpenDrawer() {
    setOpenDrawer(true);
  }

  if (isLoading) return null;

  return (
    <Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}/>
      <Route exact path='/'>
        <Home onOpenDrawer={handleOpenDrawer}/>
      </Route>
      <Route exact path='/business'>
        <Business/>
      </Route>
      <Route exact path='/add-business'>
        <AddBusiness/>
      </Route>
      <Route exact path='/added-business'>
        <AddedBusiness/>
      </Route>
      <Route exact path='/deposits'>
        <Deposits onOpenDrawer={handleOpenDrawer}/>
      </Route>
      <Route exact path='/deposit'>
        <Deposit/>
      </Route>
      <Route exact path='/add-deposit'>
        <AddDeposit/>
      </Route>
    </Fragment>
  );
}
