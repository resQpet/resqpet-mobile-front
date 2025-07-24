import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { AuthService } from '~/services/auth/AuthService';
import { UserService } from '~/services/users/UserService';
import Toast from 'react-native-toast-message';
import { User } from '~/domain/models/users/user';
import { UserPasswordLogin } from '~/domain/models/auth/login';
import { VOID } from '~/domain/types/steoreotype';

export type AuthProviderParam = { children: ReactNode };

const LOGIN_PATH = '/(auth)/login';
const REDIRECT_AFTER_LOGIN = '/(main)';
const authService = AuthService.instance;
const userService = UserService.instance;

export default interface AuthContextValue {
  current?: User;
  message?: string;
  loading?: boolean;
  logout?: VoidFunction;
  validating?: boolean;
  authenticated?: boolean;
  authenticate: (request: UserPasswordLogin) => void;
  hasAuthority?: (authority: string | undefined) => boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  authenticate: VOID,
});

export const AuthProvider: FC<AuthProviderParam> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState<User>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(true);

  useEffect(() => {
    const isProtectedRoute = !pathname.startsWith('/(auth)/login');

    if (isProtectedRoute) {
      authService
        .getCurrentToken()
        .then(
          (auth) => {
            if (!auth) throw new Error('no token');
            return userService.current();
          },
          () => {
            setCurrent(undefined);
            router.replace(LOGIN_PATH);
            throw new Error('fallo en getCurrentToken');
          }
        )
        .then(
          (user: User) => {
            setCurrent(user);
          },
          () => {
            setCurrent(undefined);
            router.replace(LOGIN_PATH);
          }
        )
        .finally(() => {
          setValidating(false);
        });
    } else {
      setValidating(false);
    }
  }, [pathname, router]);
  const authenticate = async ({ username, password }: UserPasswordLogin): Promise<void> => {
    setLoading(true);
    setMessage(undefined);
    try {
      await authService.authenticate({ username, password });
      const user = await userService.current();
      setCurrent(user);
      router.replace(REDIRECT_AFTER_LOGIN);
    } catch (e) {
      setMessage('usuario contraseña incorrecta');
      Toast.show({
        type: 'error',
        text1: 'Error de login',
        text2: 'Usuario o contraseña incorrectos: ' + e,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrent(undefined);
    router.replace(LOGIN_PATH);
  };

  const providerValue: AuthContextValue = {
    current,
    message,
    loading,
    validating,
    logout,
    authenticate,
    authenticated: current !== undefined,
  };

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
