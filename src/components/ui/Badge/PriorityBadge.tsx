import { Badge, BadgeProps } from './Badge';

export type TodoPriority = 'high' | 'medium' | 'low';

export interface PriorityBadgeProps extends Omit<BadgeProps, 'children' | 'variant'> {
  priority: TodoPriority;
}

const priorityConfig: Record<TodoPriority, { label: string; variant: BadgeProps['variant'] }> = {
  high: {
    label: 'High',
    variant: 'danger',
  },
  medium: {
    label: 'Medium',
    variant: 'warning',
  },
  low: {
    label: 'Low',
    variant: 'success',
  },
};

export const PriorityBadge = ({ priority, ...props }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.label}
    </Badge>
  );
};
