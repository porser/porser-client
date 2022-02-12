import type { User } from "types";
import createStore, { type State } from "zustand";
import { persist } from "zustand/middleware";

interface PageState extends State {
  isPageLoading: boolean;
  setPageLoading: (isLoading: boolean) => void;
}

interface AuthState extends State {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthState = createStore(
  persist<AuthState>(
    set => ({ user: null, setUser: user => set(() => ({ user })) }),
    {
      name: "porser-auth-state",
      partialize: state => ({ user: state.user })
    }
  )
);

export const usePageState = createStore<PageState>(set => ({
  isPageLoading: false,
  setPageLoading: isLoading => set(() => ({ isPageLoading: isLoading }))
}));
