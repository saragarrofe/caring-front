import './PlantSuggestions.css';
import { plantCatalog } from '../../mocks/plants';
import { CatalogPlant } from 'src/types/Plant';
import { CareLevelBadge } from '@components/CareLevelBadge/CareLevelBadge';

const POPULAR_IDS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

interface Props {
  onSelect: (plant: CatalogPlant) => void;
  excludeIds?: Set<number>;
}

export default function PlantSuggestions({ onSelect, excludeIds = new Set() }: Props) {
  const suggestions = plantCatalog
    .filter((p) => POPULAR_IDS.includes(p.id) && !excludeIds.has(p.id))
    .sort((a, b) => POPULAR_IDS.indexOf(a.id) - POPULAR_IDS.indexOf(b.id));

  if (suggestions.length === 0) return null;

  return (
    <div className="plant-suggestions">
      <p className="plant-suggestions__label">Popular picks</p>
      <div className="plant-suggestions__grid">
        {suggestions.map((plant) => (
          <button
            key={plant.id}
            type="button"
            className="plant-suggestion-card"
            onClick={() => onSelect(plant)}
          >
            <div className="plant-suggestion-card__image">
              {plant.imageUrl ? (
                <img src={plant.imageUrl} alt={plant.name} />
              ) : (
                <i className="bi bi-flower2" />
              )}
              <span className="plant-suggestion-card__badge">
                <CareLevelBadge level={plant.careLevel} />
              </span>
            </div>
            <div className="plant-suggestion-card__info">
              <span className="plant-suggestion-card__name">{plant.name}</span>

              <span className="plant-suggestion-card__meta">
                <i className="bi bi-droplet" /> {plant.wateringFrequency}d
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
