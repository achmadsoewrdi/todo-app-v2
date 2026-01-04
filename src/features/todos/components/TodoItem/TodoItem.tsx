import { useState } from 'react';
import { MoreHorizontal, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { PriorityBadge } from '@/components/ui/Badge';
import { useTodos } from '@/features/todos/hooks/useTodos';
import { isValidPriority } from '@/features/todos/types/todo.types';
import type { Todo } from '@/features/todos/types/todo.types';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleCompleted, deleteTodo } = useTodos();
  const [showActions, setShowActions] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTodo(todo.id);
    }
  };

  return (
    <div className="group flex items-start gap-3 py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
      {/* Checkbox */}
      <Checkbox
        checked={todo.is_completed ?? false}
        onChange={() => toggleCompleted(todo.id)}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`font-medium text-gray-900 ${
              todo.is_completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.title}
          </h3>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {todo.due_date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(todo.due_date).toLocaleDateString()}</span>
            </div>
          )}

          {isValidPriority(todo.priority) && (
            <PriorityBadge priority={todo.priority} size="sm" />
          )}

          {todo.description && (
            <span className="text-gray-400">• Has description</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="relative">
        <button
          onClick={() => setShowActions(!showActions)}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>

        {/* Dropdown Menu */}
        {showActions && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowActions(false)}
            />

            {/* Menu */}
            <div className="absolute right-0 top-8 z-20 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <button
                onClick={() => {
                  setShowActions(false);
                  // TODO: Implement edit
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  setShowActions(false);
                  handleDelete();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
