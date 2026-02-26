import './PlantCard.css';

import { Link } from 'react-router-dom';
import { getWateringReminder, getHydrationPercent } from '@utils/reminders';
import { daysUntil } from '@utils/dates';
import { Plant } from 'src/types/plant';

type PlantCardProps = {
  plant: Plant;
};

const LIGHT_ICON: Record<string, string> = {
  Low: 'bi-cloud',
  Medium: 'bi-brightness-low',
  High: 'bi-brightness-high',
  Indirect: 'bi-brightness-alt-high',
};

export function PlantCard({ plant }: PlantCardProps) {
  const reminder = getWateringReminder(plant);
  const hydration = getHydrationPercent(plant);
  const isOverdue = reminder.status === 'overdue' || reminder.status === 'due';

  const daysSinceWatered = -daysUntil(plant.lastWatered);
  const lastWateredLabel =
    daysSinceWatered === 0
      ? 'Today'
      : daysSinceWatered === 1
        ? '1d ago'
        : `${daysSinceWatered}d ago`;

  return (
    <Link
      to={`/my-plants/${plant.id}`}
      className="plant-card text-decoration-none"
    >
      <div className="plant-card__image">
        {plant.imageUrl && (
          <img
            src={plant.imageUrl}
            alt={`${plant.name} — ${plant.species}`}
            loading="lazy"
          />
        )}
        {plant.location && (
          <span className="plant-card__location">{plant.location}</span>
        )}
      </div>

      <div className="plant-card__body">
        <h3 className="plant-card__name">{plant.name}</h3>
        <p className="plant-card__species">{plant.species}</p>

        <div className="plant-card__hydration">
          <div className="plant-card__hydration-header">
            <span className="plant-card__hydration-label">HYDRATION</span>
            <span
              className={`plant-card__hydration-value ${isOverdue ? 'plant-card__hydration-value--danger' : ''}`}
            >
              {hydration}%
            </span>
          </div>
          <div className="plant-card__hydration-track">
            <div
              className={`plant-card__hydration-fill ${isOverdue ? 'plant-card__hydration-fill--danger' : ''}`}
              style={{ width: `${hydration}%` }}
            />
          </div>
        </div>

        <div className="plant-card__info">
          {plant.light && (
            <div className="plant-card__info-item">
              <i className={`bi ${LIGHT_ICON[plant.light]}`} />
              <span>{plant.light}</span>
            </div>
          )}
          <div className="plant-card__info-item">
            <i className="bi bi-calendar3" />
            <span>{plant.wateringFrequency} days</span>
          </div>
          <div
            className={`plant-card__info-item plant-card__water-btn ${isOverdue ? 'plant-card__water-btn--overdue' : ''}`}
          >
            <i className="bi bi-droplet-fill" />
            {isOverdue ? (
              <span className="plant-card__overdue-label">OVERDUE</span>
            ) : (
              <span>{lastWateredLabel}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
