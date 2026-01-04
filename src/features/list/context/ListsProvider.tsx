import { ReactNode, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth';
import { ListsContext } from './ListsContext';
import type { List, ListInsert, ListUpdate } from '../types/list.types';

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
  const { user } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLists = useCallback(async () => {
    if (!user) {
      setLists([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLists(data || []);
    } catch (error) {
      console.error('Error fetching lists:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const createList = async (list: ListInsert): Promise<List> => {
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('lists')
      .insert([{ ...list, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;

    setLists((prev) => [...prev, data]);
    return data;
  };

  const updateList = async (id: string, updates: ListUpdate): Promise<List> => {
    const { data, error } = await supabase
      .from('lists')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    setLists((prev) => prev.map((list) => (list.id === id ? data : list)));
    return data;
  };

  const deleteList = async (id: string): Promise<void> => {
    const { error } = await supabase.from('lists').delete().eq('id', id);
    if (error) throw error;

    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        loading,
        createList,
        updateList,
        deleteList,
        refetch: fetchLists,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}
