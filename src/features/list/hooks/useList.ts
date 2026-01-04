import { useContext } from 'react';
import { ListsContext } from '../context/ListsContext';

export function useLists() {
  const context = useContext(ListsContext);

  if (!context) {
    throw new Error('useLists must be used within ListsProvider');
  }

  return context;
}
