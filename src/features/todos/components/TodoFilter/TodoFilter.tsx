import { Select } from '@/components/ui/Select/Select';
import { Input } from '@/components/ui/Input/Input';

interface TodoFilterProps {
  status: string;
  priority: string;
  search: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onSearchChange: (search: string) => void;
}

export function TodoFilter({
  status,
  priority,
  search,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}: TodoFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
      />

      <Select
        placeholder="All Status"
        options={[
          { value: '', label: 'All Status' },
          { value: 'not-started', label: 'Not Started' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'done', label: 'Done' },
          { value: 'pending', label: 'Pending' },
          { value: 'cancelled', label: 'Cancelled' },
        ]}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      />

      <Select
        placeholder="All Priority"
        options={[
          { value: '', label: 'All Priority' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' },
        ]}
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
      />
    </div>
  );
}
