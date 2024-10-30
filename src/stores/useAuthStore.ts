import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { UserInfo } from 'types/auth';

interface AuthState {
  session: Session | null;
  userInfo: UserInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  setSession: (session: Session | null) => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState: AuthState = {
  session: null,
  userInfo: null,
  isLoading: false,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      immer(set => ({
        ...initialState,

        setSession: session => {
          set(
            state => {
              state.session = session;
              state.isAuthenticated = !!session;
            },
            undefined,
            'auth/setSession',
          );
        },
        setUserInfo: userInfo => {
          set(
            state => {
              state.userInfo = userInfo;
            },
            undefined,
            'auth/setUserInfo',
          );
        },
        setIsLoading: isLoading => {
          set(
            state => {
              state.isLoading = isLoading;
            },
            undefined,
            'auth/setIsLoading',
          );
        },
        reset: () => {
          set(initialState, undefined, 'auth/reset');
        },
      })),
      {
        name: 'userData',
        partialize: state => ({
          userInfo: state.userInfo,
        }),
      },
    ),
  ),
);
