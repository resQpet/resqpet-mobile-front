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
        const token = await authService.getCurrentToken();
        set({ token, isAuthenticated: !!token });
    },

    setToken: (token) => set({ token, isAuthenticated: !!token }),

    logout: async () => {
        await authService.logout();
        set({ token: null, isAuthenticated: false });
    },
}));