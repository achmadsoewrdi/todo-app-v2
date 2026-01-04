import { useState, useMemo } from 'react';
import { Calendar, List as ListIcon, Layout, Plus, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useTodos } from '@/features/todos';
import { useListsWithCount, ListItem, ListForm } from '@/features/list';

interface SidebarProps {
  onSignOut: () => void;
}

export function Sidebar({ onSignOut }: SidebarProps) {
  const { todos } = useTodos();
  const { lists } = useListsWithCount(); // ✅ Dynamic lists with todo count
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const counts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];

    return {
      upcoming: todos.filter((t) => !t.is_completed).length,
      today: todos.filter((t) => !t.is_completed && t.due_date === today).length,
    };
  }, [todos]);

  return (
    <>
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Menu</h1>
            <button className="text-gray-400 hover:text-gray-600">
              <Layout className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neon-grass-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
          {/* Tasks Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Tasks
            </h3>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span>Upcoming</span>
                </div>
                {counts.upcoming > 0 && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {counts.upcoming}
                  </span>
                )}
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg font-medium">
                <div className="flex items-center gap-3">
                  <ListIcon className="w-4 h-4 text-gray-700" />
                  <span>Today</span>
                </div>
                <span className="text-xs text-gray-700 bg-gray-200 px-2 py-0.5 rounded-full">
                  {counts.today}
                </span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Calendar</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Layout className="w-4 h-4 text-gray-400" />
                <span>Sticky Wall</span>
              </button>
            </div>
          </div>

          {/* Lists Section - ✅ Dynamic from Database */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Lists
            </h3>
            <div className="space-y-1">
              {lists.map((list) => (
                <ListItem key={list.id} list={list} />
              ))}

              <button
                onClick={() => setIsListModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New List</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Settings</span>
          </button>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-400" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Add List Modal */}
      <Modal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        title="Create New List"
      >
        <ListForm
          onSuccess={() => setIsListModalOpen(false)}
          onCancel={() => setIsListModalOpen(false)}
        />
      </Modal>
    </>
  );
}
