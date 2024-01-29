import React, { useEffect } from 'react';
import { App as AppPlugin } from '@capacitor/app';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ProtectedRoute, ErrorPage } from '@recargas-dominicanas/core/components';
import { SplashScreen } from '../../components/splash-screen/splash-screen.component';
import { Login } from '../login/login.component';
import { Main } from '../main/main.component';

export function App() {

  const history = useHistory();

  useEffect(() => {

    AppPlugin.addListener('backButton', (event) => {

      const currentRoute = history.location.pathname;

      // This are the routes set in the navigation drawer
      const rootRoutes = [
        '/transactions',
        '/settings'
      ];

      // If the user can go back, and the current route isn't the / route or 
      // one of the root routes then go back.
      if (event.canGoBack && currentRoute !== '/' && !rootRoutes.includes(currentRoute)) {
        history.goBack();
        return;
      }

      // If the current route is one of the root routes, but isn't the / route,
      // then navigate to the / route.
      if (rootRoutes.includes(currentRoute)) {
        history.replace('/');
        return;
      }
  
      // If the current route is the / route, close the application.
      AppPlugin.exitApp();
    });
  }, []);

  return (
    <Switch>
      <Route exact path='/login'>
        <Login/>
      </Route>
      <Route exact path='/error'>
        <ErrorPage image='server-error.png'/>
      </Route>
      <ProtectedRoute 
        path='/'
        fallback={<SplashScreen animate/>}>
        <Main/>
      </ProtectedRoute>
    </Switch>
  );
}
