import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '@recargas-dominicanas/core/components';
import { Login } from '../login/login.component';
import { Main } from '../main/main.component';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <ProtectedRoute path='/' role='admin'>
          <Main/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}
