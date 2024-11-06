import { create } from 'zustand';

type SearchQueryState = {
  query: string;
};

type SearchQueryActions = {
  setQuery: (query: string) => void;
  reset: () => void;
};

const initialState: SearchQueryState = {
  query: '',
};

export const useSearchQueryStore = create<SearchQueryState & SearchQueryActions>(set => ({
  ...initialState,
  setQuery: (query: string) => {
    set({ query });
  },
  reset: () => {
    set(initialState);
  },
}));
