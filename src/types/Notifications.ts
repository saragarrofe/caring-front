type NotificationType =
  | 'watering_due'
  | 'watering_overdue'
  | 'fertilizing_due'
  | 'pruning_due'
  | 'repotting_due'
  | 'light_warning'
  | 'temperature_warning'
  | 'humidity_warning'
  | 'health_alert'
  | 'care_tip'
  | 'system';

export type Notification = {
  id: string;
  type: NotificationType;
  plantId?: string;
  title: string;
  message: string;
  scheduledAt: string;
  isRead: boolean;
  isCompleted?: boolean;
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    kind: 'complete_care' | 'view_plant';
  };
};
