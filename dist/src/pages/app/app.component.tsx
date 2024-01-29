import React from 'react';
import { ErrorPage, ProtectedRoute } from '@recargas-dominicanas/core/components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../login/login.component';
import { Main } from '../main/main.component';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path='/error'>
          <ErrorPage image='server-error.png'/>
        </Route>
        <ProtectedRoute path='/'>
          <Main/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}
