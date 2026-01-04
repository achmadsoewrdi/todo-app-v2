import { BadgeProps } from './Badge';

// Status Types
export type TodoStatus = 'done' | 'in-progress' | 'not-started' | 'pending' | 'cancelled';

export interface StatusBadgeProps extends Omit<BadgeProps, 'children' | 'variant'> {
  status: TodoStatus;
}

// Priority Types
export type TodoPriority = 'high' | 'medium' | 'low';

export interface PriorityBadgeProps extends Omit<BadgeProps, 'children' | 'variant'> {
  priority: TodoPriority;
}
