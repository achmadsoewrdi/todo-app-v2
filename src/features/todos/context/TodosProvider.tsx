import { ReactNode, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth';
import { TodosContext } from './TodosContext';
import type { Database } from '@/types/database.types';

type Todo = Database['public']['Tables']['todos']['Row'];
type TodoInsert = Omit<Database['public']['Tables']['todos']['Insert'], 'user_id'>;
type TodoUpdate = Database['public']['Tables']['todos']['Update'];

interface TodosProviderProps {
  children: ReactNode;
}

export function TodosProvider({ children }: TodosProviderProps) {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (todo: TodoInsert): Promise<Todo> => {
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('todos')
      .insert([{ ...todo, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;

    // ✅ Update shared state
    setTodos((prev) => [data, ...prev]);
    return data;
  };

  const updateTodo = async (id: string, updates: TodoUpdate): Promise<Todo> => {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // ✅ Update shared state
    setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
    return data;
  };

  const deleteTodo = async (id: string): Promise<void> => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) throw error;

    // ✅ Update shared state
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = async (id: string): Promise<void> => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // Optimistic update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_completed: !t.is_completed } : t))
    );

    try {
      await updateTodo(id, { is_completed: !todo.is_completed });
    } catch (error) {
      // Rollback on error
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_completed: todo.is_completed } : t))
      );
      throw error;
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        loading,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleCompleted,
        refetch: fetchTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
