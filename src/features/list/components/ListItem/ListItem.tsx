import { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { useLists } from '../../hooks/useList';
import type { ListWithCount } from '../../types/list.types';

interface ListItemProps {
  list: ListWithCount;
  isActive?: boolean;
  onClick?: () => void;
}

export function ListItem({ list, isActive, onClick }: ListItemProps) {
  const { deleteList } = useLists();
  const [showActions, setShowActions] = useState(false);

  const handleDelete = async () => {
    if (list.todo_count > 0) {
      if (!confirm(`This list has ${list.todo_count} task(s). Delete anyway? All tasks will be unassigned from this list.`)) {
        return;
      }
    } else {
      if (!confirm(`Delete "${list.name}" list?`)) {
        return;
      }
    }

    try {
      await deleteList(list.id);
      setShowActions(false);
    } catch (error) {
      console.error('Failed to delete list:', error);
      alert('Failed to delete list. Please try again.');
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
          isActive
            ? 'bg-gray-100 text-gray-900 font-medium'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 bg-${list.color}-400 rounded flex-shrink-0`}></div>
          <span className="truncate">{list.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {list.todo_count > 0 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {list.todo_count}
            </span>
          )}

          {/* More Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
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
          <div className="absolute right-2 top-10 z-20 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(false);
                // TODO: Implement edit
                alert('Edit feature coming soon!');
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
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
  );
}
