import { useState } from 'react';
import { useAsyncEffect } from '../utils/useAsyncEffect';
import { AuthApi } from '../api/auth.api';

/**
 * Check if the user is auth
 * 
 * @returns [isAuth, isLoading, authFail]
 */
export function useIsAuth(role: 'admin' | 'customer' | 'businessUser') {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authFail, setAuthFail] = useState(false);

  useAsyncEffect(async () => {

    try {
      const auth = await AuthApi.isAuth({ version: 2 });
      setIsAuth(auth.isAuth && auth.role === role);
    } catch (err) {
      setAuthFail(true);
    } finally {
      setIsLoading(false);
    }
  });

  return [isAuth, isLoading, authFail];
}
