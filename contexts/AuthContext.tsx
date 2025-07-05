import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { AuthService } from '~/services/auth/authService';
import { UserService } from '~/services/users/userService';
import { User } from '~/domain/model/users/user';
import { UserPasswordLogin } from '~/domain/model/auth/login';
import { VOID } from '~/domain/types/steoreotype';


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
    hasAuthority?: (authority: string) => boolean;
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
            authService.getCurrentToken()
                .then((auth)=>{
                    if(!auth)throw new Error ('no token');
                    return userService.current();
                })
                .then((user:User)=>{
                    setCurrent(user)
                })
                .catch(()=>{
                    setCurrent(undefined);
                    router.replace(LOGIN_PATH);
                })
                .finally(()=>{
                    setValidating(false);
                })
        } else {
            setValidating(false);
        }
    }, [pathname]);

    const hasAuthority = (authority: string): boolean => {
        if (!current) return false;
        return current.role.name === 'Dev' || current.role.authorities?.some(a => a.name === authority) || false;
    };

   const authenticate = async ({ username, password }: UserPasswordLogin): Promise<void> => {
        setLoading(true);
        setMessage(undefined);

        try{
            await authService.authenticate({username,password});
            const user = await userService.current();
            setCurrent(user);
            router.replace(REDIRECT_AFTER_LOGIN);

        }
        catch(e){
            console.log('error en autheticate',e)
            setMessage('usuario contraseña incorrecta')
        }
        finally{
            setLoading(false)
        }
    }

    const logout = () => {
        authService
            .logout()
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
        hasAuthority,
    };

    return (<AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>);
}

export const useAuthContext = () => useContext(AuthContext);
