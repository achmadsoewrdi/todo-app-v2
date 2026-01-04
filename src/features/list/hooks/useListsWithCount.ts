import { useMemo } from 'react';
import { useLists } from './useList';
import { useTodos } from '@/features/todos';
import type { ListWithCount } from '../types/list.types';

export function useListsWithCount() {
  const { lists, ...rest } = useLists();
  const { todos } = useTodos();

  const listsWithCount: ListWithCount[] = useMemo(() => {
    return lists.map((list) => ({
      ...list,
      todo_count: todos.filter((todo) => todo.list_id === list.id).length,
    }));
  }, [lists, todos]);

  return {
    lists: listsWithCount,
    ...rest,
  };
}
