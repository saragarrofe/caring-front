import './PlantUrgentCard.css';

import { Link } from 'react-router-dom';
import { Plant } from 'src/types/plant';
import { getWateringReminder } from '@utils/reminders';
import { daysUntil } from '@utils/dates';

type PlantUrgentCardProps = {
  plant: Plant;
  onWater: (plantId: number) => void;
};

export function PlantUrgentCard({ plant, onWater }: PlantUrgentCardProps) {
  const reminder = getWateringReminder(plant);
  const daysSinceWatered = -daysUntil(plant.lastWatered);

  const lastWateredLabel =
    daysSinceWatered === 0
      ? 'Today'
      : daysSinceWatered === 1
        ? 'Yesterday'
        : `${daysSinceWatered}d ago`;

  const isDanger = reminder.status === 'overdue';

  return (
    <div className="urgent-card">
      <Link
        to={`/my-plants/${plant.id}`}
        className="urgent-card__link"
        aria-label={`${plant.name} — ${reminder.label}`}
      >
        <div className="urgent-card__image-wrap">
          {plant.imageUrl ? (
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="urgent-card__image"
              loading="lazy"
            />
          ) : (
            <div className="urgent-card__image-placeholder">
              <i className="bi bi-flower2" />
            </div>
          )}
        </div>

        <div className="urgent-card__info">
          <h3 className="urgent-card__name">{plant.name}</h3>
          <p className="urgent-card__species">{plant.species}</p>
          <span className={`urgent-card__badge urgent-card__badge--${isDanger ? 'danger' : 'warning'}`}>
            <i className={`bi ${isDanger ? 'bi-exclamation-circle-fill' : 'bi-droplet-fill'}`} />
            {reminder.label}
          </span>
          <span className="urgent-card__meta">
            <i className="bi bi-droplet" /> {lastWateredLabel}
          </span>
        </div>
      </Link>

      <button
        className="urgent-card__water-btn"
        onClick={(e) => {
          e.stopPropagation();
          onWater(plant.id);
        }}
        aria-label={`Water ${plant.name}`}
      >
        <i className="bi bi-droplet-fill" />
        Water now
      </button>
    </div>
  );
}
