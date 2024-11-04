import { create } from 'zustand';

type SearchQueryStore = {
  query: string;
  setQuery: (query: string) => void;
  resetQuery: () => void;
};

export const useSearchQueryStore = create<SearchQueryStore>(set => ({
  query: '',
  setQuery: query => {
    set({ query });
  },
  resetQuery: () => {
    set({ query: '' });
  },
}));
