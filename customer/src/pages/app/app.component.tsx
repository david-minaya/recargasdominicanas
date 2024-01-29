import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '@recargas-dominicanas/core/components';
import { Login } from '../login/login.component';
import { Main } from '../main/main.component';
import { ResetPassword } from '../reset-password/reset-password.component';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/reset-password' component={ResetPassword}/>
        <ProtectedRoute path='/' role='customer'>
          <Main/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}
