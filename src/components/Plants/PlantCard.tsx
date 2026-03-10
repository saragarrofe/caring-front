import './PlantCard.css';

import { Link } from 'react-router-dom';
import { getWateringReminder, getHydrationPercent } from '@utils/reminders';
import { daysUntil } from '@utils/dates';
import { Plant } from 'src/types/plant';

type PlantCardProps = {
  plant: Plant;
};

const STATUS_CONFIG = {
  overdue: {
    label: 'Needs water',
    icon: 'bi-exclamation-circle-fill',
    class: 'danger',
  },
  due: { label: 'Water today', icon: 'bi-droplet-fill', class: 'warning' },
  upcoming: {
    label: 'On track',
    icon: 'bi-check-circle-fill',
    class: 'success',
  },
  completed: {
    label: 'Watered',
    icon: 'bi-check-circle-fill',
    class: 'success',
  },
} as const;

export function PlantCard({ plant }: PlantCardProps) {
  const reminder = getWateringReminder(plant);
  const hydration = getHydrationPercent(plant);
  const status = STATUS_CONFIG[reminder.status];

  const daysSinceWatered = -daysUntil(plant.lastWatered);
  const lastWateredLabel =
    daysSinceWatered === 0
      ? 'Today'
      : daysSinceWatered === 1
        ? 'Yesterday'
        : `${daysSinceWatered} days ago`;

  return (
    <Link
      to={`/my-plants/${plant.id}`}
      className="plant-card text-decoration-none"
      aria-label={`${plant.name} — ${status.label}`}
    >
      <div className="plant-card__image-wrap">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={`${plant.name} — ${plant.species}`}
            className="plant-card__image"
            loading="lazy"
          />
        ) : (
          <div className="plant-card__image-placeholder">
            <i className="bi bi-flower2" />
          </div>
        )}
        <span
          className={`plant-card__status plant-card__status--${status.class}`}
        >
          <i className={`bi ${status.icon}`} />
          {status.label}
        </span>
      </div>

      <div className="plant-card__body">
        <div className="plant-card__header">
          <h3 className="plant-card__name">{plant.name}</h3>
          <p className="plant-card__species">{plant.species}</p>
        </div>

        <div className="plant-card__hydration">
          <div className="plant-card__hydration-bar">
            <div
              className={`plant-card__hydration-fill plant-card__hydration-fill--${status.class}`}
              style={{ width: `${hydration}%` }}
            />
          </div>
          <span className="plant-card__hydration-value">{hydration}%</span>
        </div>

        <div className="plant-card__footer">
          <span className="plant-card__meta">
            <i className="bi bi-droplet" />
            {lastWateredLabel}
          </span>
          {plant.location && (
            <span className="plant-card__meta">
              <i className="bi bi-geo-alt" />
              {plant.location}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
