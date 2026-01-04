import { Database } from '@/types/database.types';

export type Todo = Database['public']['Tables']['todos']['Row'];
export type TodoInsert = Database['public']['Tables']['todos']['Insert'];
export type TodoUpdate = Database['public']['Tables']['todos']['Update'];

// Status & Priority types (sesuai BadgeProps)
export type TodoStatus = 'not-started' | 'in-progress' | 'done' | 'pending' | 'cancelled';
export type TodoPriority = 'high' | 'medium' | 'low';

// Type guard functions
export function isValidStatus(status: string | null | undefined): status is TodoStatus {
  if (!status) return false;
  return ['not-started', 'in-progress', 'done', 'pending', 'cancelled'].includes(status);
}

export function isValidPriority(priority: string | null | undefined): priority is TodoPriority {
  if (!priority) return false;
  return ['high', 'medium', 'low'].includes(priority);
}
