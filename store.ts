import createStore, { State } from "zustand";

interface PageState extends State {
  isPageLoading: boolean;
  setPageLoading: (isLoading: boolean) => void;
}

export const usePageState = createStore<PageState>(set => ({
  isPageLoading: false,
  setPageLoading: isLoading => set(() => ({ isPageLoading: isLoading }))
}));
