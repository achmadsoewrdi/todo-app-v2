import { Database } from '@/types/database.types';

export type List = Database['public']['Tables']['lists']['Row'];
export type ListInsert = Omit<Database['public']['Tables']['lists']['Insert'], 'user_id'>;
export type ListUpdate = Database['public']['Tables']['lists']['Update'];

export interface ListWithCount extends List {
  todo_count: number;
}

export const LIST_COLORS = [
  'red',
  'blue',
  'yellow',
  'green',
  'purple',
  'pink',
  'indigo',
  'gray',
] as const;

export type ListColor = typeof LIST_COLORS[number];
