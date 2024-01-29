import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useIsAuth } from '../../hooks';

interface Props {
  path: string;
  role: 'admin' | 'customer' | 'businessUser';
  exact?: boolean;
  fallback?: JSX.Element;
  children: ReactNode;
}

export function ProtectedRoute(props: Props) {
  
  const {
    path,
    role,
    exact = false,
    fallback = null,
    children
  } = props;

  const [isAuth, isLoading] = useIsAuth(role);

  if (isLoading) return fallback;

  return (
    <Route exact={exact} path={path}>
      {isAuth
        ? children
        : <Redirect to='/login'/>
      }
    </Route>
  );
}
