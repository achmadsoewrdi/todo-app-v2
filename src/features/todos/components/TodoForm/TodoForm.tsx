import { useState } from 'react';
import { Input } from '@/components/ui/Input/Input';
import { TextArea } from '@/components/ui/TextArea/TextArea';
import { Select } from '@/components/ui/Select/Select';
import { Button } from '@/components/ui/Button/Button';
import { useTodos } from '@/features/todos/hooks/useTodos';
import { useLists } from '@/features/list'; // ✅ Import useLists
import type { Database } from '@/types/database.types';

type TodoInsert = Database['public']['Tables']['todos']['Insert'];

interface TodoFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TodoForm({ onSuccess, onCancel }: TodoFormProps) {
  const { createTodo } = useTodos();
  const { lists } = useLists(); // ✅ Get lists
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not-started',
    priority: 'medium',
    due_date: '',
    list_id: '', // ✅ Add list_id
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const todoData: Omit<TodoInsert, 'user_id'> = {
        title: formData.title,
        description: formData.description || null,
        status: formData.status,
        priority: formData.priority,
        due_date: formData.due_date || null,
        list_id: formData.list_id || null, // ✅ Include list_id
        is_completed: false,
      };

      await createTodo(todoData);
      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create task');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        placeholder="What needs to be done?"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <TextArea
        label="Description"
        placeholder="Add more details..."
        rows={4}
        maxLength={500}
        showCharCount
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        helperText="Provide context and details for this task"
      />

      {/* ✅ List Selector */}
      <Select
        label="List (Optional)"
        options={[
          { value: '', label: 'No List' },
          ...lists.map((list) => ({
            value: list.id,
            label: list.name,
          })),
        ]}
        value={formData.list_id}
        onChange={(e) => setFormData({ ...formData, list_id: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          options={[
            { value: 'not-started', label: 'Not Started' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
            { value: 'pending', label: 'Pending' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />

        <Select
          label="Priority"
          options={[
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' },
          ]}
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        />
      </div>

      <Input
        label="Due Date (Optional)"
        type="date"
        value={formData.due_date}
        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={loading} className="flex-1">
          Create Task
        </Button>
      </div>
    </form>
  );
}
