import './UpcomingList.css';

import { Link } from 'react-router-dom';
import { Plant } from 'src/types/plant';
import { getHydrationPercent } from '@utils/reminders';
import { addDays, daysUntil } from '@utils/dates';

type UpcomingListProps = {
  plants: Plant[];
};

export function UpcomingList({ plants }: UpcomingListProps) {
  if (plants.length === 0) {
    return (
      <p className="upcoming-empty">No upcoming waterings this week.</p>
    );
  }

  return (
    <ul className="upcoming-list">
      {plants.map((plant) => {
        const hydration = getHydrationPercent(plant);
        const nextDate = addDays(new Date(plant.lastWatered), plant.wateringFrequency);
        const days = daysUntil(nextDate);
        const daysLabel = days === 1 ? 'tomorrow' : `in ${days} days`;

        return (
          <li key={plant.id}>
            <Link to={`/my-plants/${plant.id}`} className="upcoming-row">
              <div className="upcoming-row__avatar">
                {plant.imageUrl ? (
                  <img src={plant.imageUrl} alt={plant.name} />
                ) : (
                  <i className="bi bi-flower2" />
                )}
              </div>

              <div className="upcoming-row__info">
                <span className="upcoming-row__name">{plant.name}</span>
                <span className="upcoming-row__when">
                  <i className="bi bi-droplet" /> {daysLabel}
                </span>
              </div>

              <div className="upcoming-row__hydration">
                <div className="upcoming-row__bar">
                  <div
                    className="upcoming-row__fill"
                    style={{ width: `${hydration}%` }}
                  />
                </div>
                <span className="upcoming-row__percent">{hydration}%</span>
              </div>

              <i className="bi bi-chevron-right upcoming-row__chevron" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
