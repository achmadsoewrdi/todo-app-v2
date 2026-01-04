import { createContext } from 'react';
import type { Database } from '@/types/database.types';

type Todo = Database['public']['Tables']['todos']['Row'];
type TodoInsert = Omit<Database['public']['Tables']['todos']['Insert'], 'user_id'>;
type TodoUpdate = Database['public']['Tables']['todos']['Update'];

export interface TodosContextType {
  todos: Todo[];
  loading: boolean;
  createTodo: (todo: TodoInsert) => Promise<Todo>;
  updateTodo: (id: string, updates: TodoUpdate) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  toggleCompleted: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const TodosContext = createContext<TodosContextType | undefined>(undefined);
