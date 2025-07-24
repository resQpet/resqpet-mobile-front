import { create } from 'zustand';
import { AuthService } from '~/services/auth/AuthService';
import { TokenInfo } from '~/domain/models/auth/token';

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
    authService.logout();
    set({ token: null, isAuthenticated: false });
  },
}));