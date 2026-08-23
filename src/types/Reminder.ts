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
