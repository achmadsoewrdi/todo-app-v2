import { useTodos } from '@/features/todos/hooks/useTodos';
import { TodoItem } from '../TodoItem';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Plus } from 'lucide-react';

export function TodoList() {
  const { todos, loading } = useTodos();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-grass-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <Card className="text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">No tasks yet</h3>
        <p className="text-gray-600 mb-6">Create your first task to get started</p>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Create Task
        </Button>
      </Card>
    );
  }

  return (
    <Card className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Card>
  );
}
