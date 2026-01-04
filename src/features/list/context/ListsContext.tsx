import { createContext } from 'react';
import type { List, ListInsert, ListUpdate } from '../types/list.types';

export interface ListsContextType {
  lists: List[];
  loading: boolean;
  createList: (list: ListInsert) => Promise<List>;
  updateList: (id: string, updates: ListUpdate) => Promise<List>;
  deleteList: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const ListsContext = createContext<ListsContextType | undefined>(undefined);
