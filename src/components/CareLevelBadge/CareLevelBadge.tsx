import './CareLevelBadge.css';

interface Props {
  level: 'Easy' | 'Medium' | 'Hard';
}

export function CareLevelBadge({ level }: Props) {
  return (
    <span className={`care-level-badge care-level-badge--${level.toLowerCase()}`}>{level}</span>
  );
}
