import { create } from 'zustand';
import { TokenInfo } from '~/domain/model/auth/token';
import {AuthService} from "~/services/auth/authService";

const authService: AuthService = AuthService.instance;

interface AuthState {
    token: TokenInfo | null;
    isAuthenticated: boolean;
    loadToken: () => Promise<void>;
    setToken: (token: TokenInfo | null) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isAuthenticated: false,

    loadToken: async () => {
    const tokenInfo = await authService.getCurrentToken(); 
     set({ token: tokenInfo ?? null, isAuthenticated: !!tokenInfo });
    },

    setToken: (tokenInfo) => set({ token: tokenInfo, isAuthenticated: !!tokenInfo }),

    logout: async () => {
        await authService.logout();
        set({ token: null, isAuthenticated: false });
    },
}));