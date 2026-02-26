import { Plant } from 'src/types/plant';
import { addDays, daysUntil } from './dates';

export type ReminderTone = 'info' | 'warning' | 'muted' | 'success' | 'danger';

export type ReminderIcon =
  | 'droplet'
  | 'leaf'
  | 'arrows-repeat'
  | 'scissors'
  | 'sun'
  | 'thermometer-half';
export type ReminderKind =
  | 'watering'
  | 'fertilizing'
  | 'repotting'
  | 'pruning'
  | 'light'
  | 'temperature';

export type ReminderStatus = 'upcoming' | 'due' | 'overdue' | 'completed';

export type Reminder = {
  kind: ReminderKind;
  label: string;
  tone: ReminderTone;
  status: ReminderStatus;
  icon: ReminderIcon;
  date: string; 
};

export function getHydrationPercent(plant: Plant): number {
  const nextDate = addDays(new Date(plant.lastWatered), plant.wateringFrequency);
  const daysLeft = daysUntil(nextDate);
  if (daysLeft <= 0) return Math.max(0, Math.round((1 + daysLeft / plant.wateringFrequency) * 100));
  return Math.min(100, Math.round((daysLeft / plant.wateringFrequency) * 100));
}

export function getWateringReminder(plant: Plant): Reminder {
  const nextWateringDate = addDays(new Date(plant.lastWatered), plant.wateringFrequency);
  const daysLeft = daysUntil(nextWateringDate);
  if (daysLeft < 0) {
    return {
      kind: 'watering',
      label: 'Water overdue',
      tone: 'danger',
      status: 'overdue',
      icon: 'droplet',
      date: nextWateringDate,
    };
  }

  if (daysLeft === 0) {
    return {
      kind: 'watering',
      label: 'Water today',
      tone: 'info',
      status: 'due',
      icon: 'droplet',
      date: nextWateringDate,
    };
  }

  if (daysLeft === 1) {
    return {
      kind: 'watering',
      label: 'Water tomorrow',
      tone: 'muted',
      status: 'upcoming',
      icon: 'droplet',
      date: nextWateringDate,
    };
  }

  if (daysLeft <= 2) {
    return {
      kind: 'watering',
      label: `Water in ${daysLeft} days`,
      tone: 'muted',
      status: 'upcoming',
      icon: 'droplet',
      date: nextWateringDate,
    };
  }

  return {
    kind: 'watering',
    label: 'Happy',
    tone: 'success',
    status: 'upcoming',
    icon: 'leaf',
    date: nextWateringDate,
  };
}
