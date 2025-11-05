import { Reminder, ReminderIcon } from 'src/utils/reminders';
import './Reminder.css';

type ReminderBadgeProps = Pick<Reminder, 'label' | 'tone' | 'icon'> & {
  className?: string;
};

const ICON_CLASS: Record<ReminderIcon, string> = {
  droplet: 'bi-droplet',
  leaf: 'bi-leaf',
  'arrows-repeat': 'bi-arrow-repeat',
  scissors: 'bi-scissors',
  sun: 'bi-brightness-high',
  'thermometer-half': 'bi-thermometer-half',
};

export default function Reminder({
  label,
  tone,
  icon,
  className,
}: ReminderBadgeProps): JSX.Element {
  return (
    <span className={`rem-badge rem-${tone} ${className || ''}`} role="status" aria-live="polite">
      {icon && <i className={`bi ${ICON_CLASS[icon]} rem-icon`} aria-hidden="true"></i>}
      <span className="rem-label">{label}</span>
    </span>
  );
}
