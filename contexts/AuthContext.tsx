import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { AuthService } from '~/services/auth/authService';
import { UserService } from '~/services/users/userService';
import { User } from '~/domain/model/users/user';
import { UserPasswordLogin } from '~/domain/model/auth/login';
import { VOID } from '~/domain/types/steoreotype';
import { useAuthStore } from '~/store/authStore';

export type AuthProviderParam = { children: ReactNode };

const LOGIN_PATH = '/(auth)/login';
const REDIRECT_AFTER_LOGIN = '/(main)';
const authService = AuthService.instance;
const userService = UserService.instance;

export interface AuthContextValue {
    current?: User;
    message?: string;
    loading?: boolean;
    logout?: VoidFunction;
    validating?: boolean;
    authenticated?: boolean;
    authenticate: (request: UserPasswordLogin) => void;
    hasAuthority: (authority: string) => boolean;
}

export const AuthContext = createContext<AuthContextValue>({
    current: undefined,
    message: undefined,
    loading: false,
    logout: () => {},
    validating: false,
    authenticated: false,
    authenticate: VOID,
    hasAuthority: () => false,
});

export const AuthProvider: FC<AuthProviderParam> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [current, setCurrent] = useState<User>();
    const [message, setMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [validating, setValidating] = useState<boolean>(true);

    const { setToken, logout: logoutStore } = useAuthStore();

    useEffect(() => {
        const isProtectedRoute = !pathname.startsWith('/(auth)/login');

        if (isProtectedRoute) {
            userService
                .current()
                .then(setCurrent)
                .catch(() => {
                    setCurrent(undefined);
                    router.replace(LOGIN_PATH);
                })
                .finally(() => {
                    setValidating(false);
                });
        } else {
            setValidating(false);
        }
    }, [pathname]);

    const hasAuthority = (authority: string): boolean => {
        if (!current) return false;
        return current.role.name === 'Dev' || current.role.authorities?.some(a => a.name === authority) || false;
    };

    const authenticate = ({ username, password }: UserPasswordLogin): void => {
        setLoading(true);
        setMessage(undefined);

        authService
            .authenticate({ username, password })
            .then((response) => {
                const tokenInfo = authService['mapTokenToInfo'](response.token);
                setToken({ token: response.token, info: tokenInfo });

                router.replace(REDIRECT_AFTER_LOGIN);
                return userService.current();
            })
            .then((employee: User) => {
                setCurrent(employee);
            })
            .catch(() => {
                setMessage('Usuario o contraseña incorrecto.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logout = () => {
        authService
            .logout()
            .then(() => logoutStore())
            .then(() => {
                setCurrent(undefined);
                router.replace(LOGIN_PATH);
            });
    };

    const providerValue: AuthContextValue = {
        current,
        message,
        loading,
        validating,
        logout,
        authenticate,
        authenticated: current !== undefined,
        hasAuthority,
    };

    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
