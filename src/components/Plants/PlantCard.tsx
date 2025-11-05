import './PlantCard.css';

import Reminder from '@components/Reminder/Reminder';

import { Plant } from 'src/types/plant';
import { getWateringReminder } from '../../utils/reminders';

type PlantCardProps = {
  plant: Plant;
};

export function PlantCard({ plant }: PlantCardProps) {
  const wateringReminder = getWateringReminder(plant);

  return (
    <>
      <a href={`/my-plants/${plant.id}`} className="card-plant text-decoration-none text-dark">
        <div className="card-plant">
          {plant.imageUrl && (
            <div key={plant.id} className="img-wrap">
              <img
                src={plant.imageUrl}
                className="card-img-top "
                alt={`Imagen de ${plant.name}${plant.species ? ` de la especie ${plant.species}` : ''}`}
                loading="lazy"
              />
            </div>
          )}
          <div className="px-3 pb-3">
            <div className="title text-start">{plant.name}</div>
            <div className="d-grid mt-2">
              <Reminder
                label={wateringReminder.label}
                tone={wateringReminder.tone}
                icon={wateringReminder.icon}
              />
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
