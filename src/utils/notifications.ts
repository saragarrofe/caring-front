import { Plant } from 'src/types/Plant';
import { getWateringReminder } from './reminders';
import { Notification } from 'src/types/Notification';

export function generateNotifications(plants: Plant[]): Notification[] {
  const notifications: Notification[] = [];

  for (const plant of plants) {
    const reminder = getWateringReminder(plant);

    if (reminder.status === 'overdue') {
      notifications.push({
        id: `watering-${plant.id}`,
        type: 'watering_overdue',
        plantId: String(plant.id),
        title: `Check on your ${plant.nickname ?? plant.name}`,
        message: `Your ${plant.nickname ?? plant.name} might need some attention`,
        scheduledAt: new Date().toISOString(),
        isRead: false,
        priority: 'high',
        action: { label: 'View plant', kind: 'view_plant' },
      });
    } else if (reminder.status === 'due') {
      notifications.push({
        id: `watering-${plant.id}`,
        type: 'watering_due',
        plantId: String(plant.id),
        title: `Time to check on your ${plant.nickname ?? plant.name}`,
        message: `Your ${plant.nickname ?? plant.name} is due for a check today`,
        scheduledAt: new Date().toISOString(),
        isRead: false,
        priority: 'medium',
        action: { label: 'View plant', kind: 'view_plant' },
      });
    }
  }
  return notifications;
}
