import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth';

interface List {
  id: string;
  name: string;
  color: string;
  icon?: string;
  count?: number;
}

export function useLists() {
  const { user } = useAuth();
  const [lists, setLists] = useState<List[]>([]);

  const fetchLists = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('lists')
      .select('*, todos(count)')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching lists:', error);
      return;
    }

    setLists(data || []);
  }, [user]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return { lists, refetch: fetchLists };
}
