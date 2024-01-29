import React from 'react';
import serverError from '../../images/server-error.png';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CreatePassword } from '../create-password/create-password.component';
import { Login } from '../login/login.component';
import { Main } from '../main/main.component';
import { NotFound } from '../not-found/not-found.component';
import { ErrorPage, ProtectedRoute } from '@recargas-dominicanas/core/components';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/create-password/:token' component={CreatePassword}/>
        <Route path='/page-not-found' component={NotFound}/>
        <Route path='/error'>
          <ErrorPage image={serverError}/>
        </Route>
        <ProtectedRoute path='/' role='businessUser'>
          <Main/>
        </ProtectedRoute>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
