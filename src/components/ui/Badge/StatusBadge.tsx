import { Badge, BadgeProps } from './Badge';

export type TodoStatus = 'done' | 'in-progress' | 'not-started' | 'pending' | 'cancelled';

export interface StatusBadgeProps extends Omit<BadgeProps, 'children' | 'variant'> {
  status: TodoStatus;
}

const statusConfig: Record<TodoStatus, { label: string; variant: BadgeProps['variant'] }> = {
  'done': {
    label: 'Done',
    variant: 'success',
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'warning',
  },
  'not-started': {
    label: 'Not Started',
    variant: 'default',
  },
  'pending': {
    label: 'Pending',
    variant: 'primary',
  },
  'cancelled': {
    label: 'Cancelled',
    variant: 'danger',
  },
};

export const StatusBadge = ({ status, ...props }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} withDot {...props}>
      {config.label}
    </Badge>
  );
};
