import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '@/features/auth';
import { TodoList, TodoForm } from '@/features/todos';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal';
import { useTodos } from '@/features/todos/hooks/useTodos';

export function Dashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { todos } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayCount = todos.filter((t) => !t.is_completed).length;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onSignOut={handleSignOut} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">Today</h1>
                <span className="text-3xl font-light text-gray-400">{todayCount}</span>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Add New Task
            </Button>
          </div>

          {/* Todo List */}
          <TodoList />
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <TodoForm
          onSuccess={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
